# My Gym — Design Research & Interaction Architecture

## 1. Executive Summary & Vision

**My Gym** is a self-hosted, privacy-first, athletic fitness companion engineered for rapid workout logging, progressive overload tracking, and deep physiological analytics. Built as a customized derivative of the openGym architecture, My Gym introduces an athletic dark-studio visual identity, Google Stitch MCP-guided ergonomics, and an original anime-inspired training companion named **Kairo**.

---

## 2. Competitive & Modern Fitness UX Research

To create a premier training experience, we analyzed interaction paradigms from leading mobile and web workout applications:

### 2.1 Hevy & Strong (Active Workout Ergonomics)
- **Strengths:** 
  - Rapid tabular set entry (`[SET] [PREV] [KG] [REPS] [✓]`).
  - Minimal friction: tapping the checkmark advances immediately to the next set.
  - Floating or persistent countdown rest timer with quick +/- 30s adjustment.
- **My Gym Adaptation:**
  - Dedicated tactile steppers for KG and REPS with large minimum 44px tap targets.
  - Distinct active row visual focus with subtle acid-lime border illumination and container elevation.
  - Unobtrusive rest timer widget that stays accessible across view transitions without blocking workout logging.

### 2.2 Fitbod (Progression & Fatigue Modeling)
- **Strengths:**
  - Muscle recovery heatmaps and structural balance feedback.
  - Clear progression rules (Greyskull LP, linear, double/triple progression).
- **My Gym Adaptation:**
  - Preserved openGym's scientific progression engine and muscle recovery algorithms (`src/lib/recovery.js`, `src/lib/progression.js`).
  - Enhanced visual contrast for muscle targeting and volume distribution.

### 2.3 Nike Training Club & Studio Design Systems (Aesthetics & Feel)
- **Strengths:**
  - Confident athletic typography: bold condensed headings paired with high-legibility tabular body type.
  - High-energy accent colors (acid lime, volt yellow) against deep pitch-black / obsidian backdrops.
- **My Gym Adaptation:**
  - Adopted deep obsidian (`#0D110F`) as the foundational dark theme canvas, preventing washed-out grey tones.
  - Card surfaces at `#151B17` and elevated surfaces at `#202922`.
  - Acid lime (`#C7F36B`) as the primary high-voltage action token, paired with warm amber (`#F59E0B`) for PR milestones and achievement celebratory states.

---

## 3. Human Factors & Interaction Design Principles

### 3.1 Thumb-Reach & One-Handed Operation
- In a gym environment, users frequently log sets with one hand while holding equipment or resting between sets.
- Critical controls (set completion checkmark, rest timer skips, start workout CTA) are anchored within comfortable thumb arcs in bottom and mid-screen zones.
- Navigation utilizes a bottom tab bar with 5 clear destinations: Home, Workouts, Exercises, Analytics, Profile.

### 3.2 Visual Hierarchy & Contrast
- Strict WCAG 2.1 AA text contrast compliance:
  - Dark Mode: Primary text `#F3F6F0` (contrast ratio > 16:1 against `#0D110F`), secondary text `#A5B0A6` (> 7:1).
  - Light Mode: Primary text `#1A241C` (> 14:1 against `#F5F7F2`), secondary text `#59665C` (> 4.8:1), accessible dark green `#45691F` for light theme accents (> 4.5:1).
  - High-impact acid lime `#C7F36B` buttons feature high-contrast dark label typography (`#0C0E12`, > 12:1).

### 3.3 Motion & Microinteractions
- Presses give immediate tactile feedback (scale 0.96–0.98 over 140ms on a cubic-bezier curve).
- Reduced-motion queries (`@media (prefers-reduced-motion: reduce)`) disable all decorative animations and substitute instant transitions.
- Mascot animations use lightweight CSS keyframes with static fallbacks.

---

## 4. Kairo Mascot Companion System

Inspired by supportive recurring companions, **Kairo** is an athletic fox-like training spirit:
- **Appearance:** Compact athletic silhouette, angular pointed ears with dark tips, charcoal gym jacket (`#1E2521`), acid-lime zip & trim (`#C7F36B`), warm amber eyes (`#F59E0B`), and vibrant orange-amber fur (`#E06D2B`).
- **Personality:** Encouraging, focused, never intrusive. Speaks with concise, motivating cues.
- **Rules of Engagement:**
  1. *Never obstructs active lifting:* During a workout, Kairo appears only in a compact docked status pill or bottom tip bar.
  2. *Empathetic error recovery:* Guides users through empty libraries or missed workouts with constructive recovery advice.
  3. *Celebratory milestones:* Confetti, victory poses, and PR celebrations upon completing sessions.

---

## 5. References & Inspirations
- Apple Human Interface Guidelines (Typography, Modality, Sheet Ergonomics)
- Material Design 3 (Design Tokens, Color fidelity, Tonal spot containers)
- WCAG 2.1 AA Specification for Digital Accessibility
- openGym Architecture (`docs/ARCHITECTURE.md`)
