import { describe, it, expect, vi, beforeEach } from 'vitest'

// The Android half of the updater: download the APK natively, then hand it to the Install plugin.
// The plugins are stand-ins; what is checked is the order of things and when the installer opens.
const m = vi.hoisted(() => ({
  active: true, appListeners: [], calls: [],
  installApk: null, downloadFile: null, deleteFile: null,
}))
vi.mock('./mobile.js', () => ({ MOBILE: true }))
vi.mock('@capacitor/core', () => ({ registerPlugin: () => ({ installApk: a => m.installApk(a) }) }))
vi.mock('@capacitor/filesystem', () => ({
  Directory: { Cache: 'CACHE' },
  Encoding: { UTF8: 'utf8' },
  Filesystem: {
    addListener: () => Promise.resolve({ remove: () => Promise.resolve() }),
    downloadFile: a => m.downloadFile(a),
    deleteFile: a => m.deleteFile(a),
  },
}))
vi.mock('@capacitor/app', () => ({
  App: {
    getState: () => Promise.resolve({ isActive: m.active }),
    addListener: (ev, fn) => { m.appListeners.push(fn); return Promise.resolve({ remove: () => { m.appListeners = m.appListeners.filter(f => f !== fn) } }) },
  },
}))

import { downloadAndInstall, whenInForeground, forgetDownloadedUpdate } from './update.js'

const HASH = 'a'.repeat(64)
const tick = async (n = 10) => { for (let i = 0; i < n; i++) await Promise.resolve() }
const comeBack = () => { m.active = true; for (const fn of [...m.appListeners]) fn({ isActive: true }) }

beforeEach(() => {
  m.active = true; m.appListeners = []; m.calls = []
  // Nothing in the cache yet: the plugin refuses the first call, as InstallPlugin.java does.
  m.cached = false
  m.installApk = vi.fn(async a => {
    m.calls.push('install')
    if (!m.cached) throw new Error('APK file not found: ' + a.fileName)
  })
  m.downloadFile = vi.fn(async () => { m.calls.push('download'); m.cached = true })
  m.deleteFile = vi.fn(async () => {})
})

describe('downloadAndInstall (Android hardened)', () => {
  it('opens trusted My Gym GitHub release links externally without in-app APK install', async () => {
    const open = vi.fn()
    globalThis.window = { open }
    try {
      const url = 'https://github.com/RahulBongu/my-gym/releases/download/v9.9.9/my-gym.apk'
      await downloadAndInstall(url, HASH)
      expect(open).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer')
      expect(m.installApk).not.toHaveBeenCalled()
      expect(m.downloadFile).not.toHaveBeenCalled()
    } finally {
      delete globalThis.window
    }
  })

  it('falls back to the canonical My Gym releases page for untrusted or missing URLs', async () => {
    const open = vi.fn()
    globalThis.window = { open }
    try {
      await downloadAndInstall('https://untrusted.example/app.apk', HASH)
      expect(open).toHaveBeenCalledWith('https://github.com/RahulBongu/my-gym/releases/latest', '_blank', 'noopener,noreferrer')
      await downloadAndInstall(null, null)
      expect(open).toHaveBeenLastCalledWith('https://github.com/RahulBongu/my-gym/releases/latest', '_blank', 'noopener,noreferrer')
    } finally {
      delete globalThis.window
    }
  })
})

describe('whenInForeground', () => {
  it('resolves at once when the app is in front, or when its state cannot be read', async () => {
    await whenInForeground({ getState: async () => ({ isActive: true }), addListener: vi.fn() })
    await whenInForeground({ getState: async () => { throw new Error('no plugin') }, addListener: vi.fn() })
  })

  it('in the background: waits for the app to become active', async () => {
    let fire = null
    const app = {
      getState: vi.fn(async () => ({ isActive: false })),
      addListener: vi.fn((ev, fn) => { fire = fn; return Promise.resolve({ remove: vi.fn() }) }),
    }
    let done = false
    const p = whenInForeground(app).then(() => { done = true })
    await tick()
    expect(done).toBe(false)
    fire({ isActive: false })
    await tick()
    expect(done).toBe(false)
    fire({ isActive: true })
    await p
    expect(app.addListener).toHaveBeenCalledWith('appStateChange', expect.any(Function))
  })
})

describe('forgetDownloadedUpdate', () => {
  it('deletes the update APK from the cache, and is quiet when there is none', async () => {
    await forgetDownloadedUpdate()
    expect(m.deleteFile).toHaveBeenCalledWith({ path: 'opengym-update.apk', directory: 'CACHE' })
    m.deleteFile = vi.fn(async () => { throw new Error('File does not exist') })
    await expect(forgetDownloadedUpdate()).resolves.toBeUndefined()
  })
})
