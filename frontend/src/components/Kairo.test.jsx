import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Kairo from './Kairo.jsx';

describe('Kairo mascot component', () => {
  it('renders default welcome pose', () => {
    const html = renderToString(<Kairo />);
    expect(html).toContain('kairo-container');
    expect(html).toContain('kairo-avatar-wrap');
    expect(html).toContain('kairo-tail');
    expect(html).toContain('kairo-jacket');
    expect(html).toContain('pose-welcome');
  });

  it('renders focus pose with sweatband', () => {
    const html = renderToString(<Kairo pose="focus" />);
    expect(html).toContain('kairo-sweatband');
  });

  it('renders celebrate and trophy poses', () => {
    const celebrate = renderToString(<Kairo pose="celebrate" />);
    expect(celebrate).toContain('pose-celebrate');

    const trophy = renderToString(<Kairo pose="trophy" />);
    expect(trophy).toContain('pose-trophy');
  });

  it('renders rest and timer poses', () => {
    const rest = renderToString(<Kairo pose="rest" />);
    expect(rest).toContain('kairo-eyes-rest');

    const timer = renderToString(<Kairo pose="timer" />);
    expect(timer).toContain('pose-timer');
  });

  it('renders message bubble when provided', () => {
    const msg = "Hit a new personal record today!";
    const html = renderToString(<Kairo pose="encourage" message={msg} tag="Kairo Coach" />);
    expect(html).toContain('kairo-bubble');
    expect(html).toContain(msg);
    expect(html).toContain('Kairo Coach');
  });
});
