# My Gym — Design Research & Interaction Architecture

## 1. Executive Summary & Vision

**My Gym** is a self-hosted, privacy-first workout & body-weight tracker engineered for effortless daily training, progressive overload, and clear analytics. Built atop the **openGym** engine (AGPL-3.0-or-later), My Gym uses a Light-first **Daylight Studio & Electric Indigo** architecture with pre-loaded starter routines (`Push`, `Pull`, `Legs`), immediate exercise visibility, and generous tap targets.

---

## 2. Structural & Simplicity Principles

### 2.1 Zero-Empty-State First Run (`useStore.js`, `Login.jsx`, `Home.jsx`)
- **Starter Exercises Included:** Every new local user (`chooseLocalMode()` on Android/iOS or local guest entry) starts with a balanced 3-day starter split (`Push`, `Pull`, `Legs` scheduled `Mon / Wed / Fri` via `lib/starter.js`), populated with catalogue exercises so workouts are ready on first launch.
- **Clean Module Defaults:** New profiles launch in **Light mode** (`#F3F5F9` canvas, `#FFFFFF` cards, `#4F46E5` indigo accent) with secondary power-user overlays off by default under *Settings → Modules*.
- **Uncluttered Top Viewports:** Home leads immediately with a high-contrast Midnight Slate Hero Workout card (showing Today's session + live exercise preview pills) and 1-tap quick-start routine tiles underneath; banner boxes (`Recap`, `Deload`, `Challenges`, `StreakRule`, persistent mascot banners) stay out of daily utility views.
- **Prominent Header Controls:** The top-right Settings gear button (`46px × 46px` squircle, `23px` icon) and header actions are sized for clear visibility and reliable thumb reach.

### 2.2 Active Workout & Analytics Ergonomics
- Rapid tabular set entry (`44px+` steppers, focus rings, floating rest timer bar).
- Full-fidelity preservation of openGym progression rules (`src/lib/progression.js`) and recovery modeling (`src/lib/recovery.js`).

---

## 3. Accessibility & Motion
- **WCAG 2.1 AA Compliance:** Automated contrast and transparency checks (`design-review.test.js`, `a11y-contrast-transparency.test.js`), with `prefers-contrast: more` overrides (`#312E81` deeper indigo ink) and solid fallback docks under `prefers-reduced-transparency: reduce`.
- **Tactile Feedback:** Fast `140ms` scale transitions (`0.97` buttons, `0.985` cards) disabled under `prefers-reduced-motion: reduce`.
