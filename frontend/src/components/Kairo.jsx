import React from 'react';
import './kairo.css';

/**
 * Kairo — The Original Athletic Fox Training Companion for My Gym
 *
 * Vector-based, scalable, animated, WCAG AA compliant.
 * Supports multiple poses: 'welcome', 'focus', 'encourage', 'celebrate', 'trophy', 'timer', 'empty', 'rest'
 */
export default function Kairo({
  pose = 'welcome',
  size = 'md',
  message,
  tag = 'Kairo Coach',
  animated = true,
  className = '',
  onClick,
}) {
  const pixelSizes = {
    xs: 28,
    sm: 40,
    md: 56,
    lg: 84,
    xl: 120,
    hero: 160,
  };

  const dim = pixelSizes[size] || (typeof size === 'number' ? size : 56);

  // SVG dimensions: viewBox 0 0 100 100
  return (
    <div
      className={`kairo-container ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : 'figure'}
      aria-label={`Kairo the gym companion (${pose})`}
    >
      <div
        className={`kairo-avatar-wrap ${animated ? 'kairo-animated' : ''}`}
        style={{ width: `${dim}px`, height: `${dim}px`, flexShrink: 0 }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fur gradient */}
            <linearGradient id="kairo-fur" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EA7332" />
              <stop offset="100%" stopColor="#C45116" />
            </linearGradient>

            {/* Inner ear gradient */}
            <linearGradient id="kairo-ear-inner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF7E6" />
              <stop offset="100%" stopColor="#F9DFB8" />
            </linearGradient>

            {/* Jacket gradient */}
            <linearGradient id="kairo-jacket" x1="30" y1="65" x2="70" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2B211C" />
              <stop offset="100%" stopColor="#1E1815" />
            </linearGradient>

            {/* Glow effect */}
            <radialGradient id="kairo-glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--acc, #D14615)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--acc, #D14615)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="50" cy="50" r="48" fill="url(#kairo-glow-grad)" className={animated ? 'kairo-glow' : ''} />

          {/* Bushy Fox Tail (left side behind jacket) */}
          <g id="kairo-tail">
            <path
              d="M26 74 C14 70 8 52 16 42 C20 37 26 40 28 47 C30 54 28 66 26 74 Z"
              fill="url(#kairo-fur)"
            />
            {/* White Tail Tip */}
            <path
              d="M16 42 C12 47 11 54 14 59 C18 53 23 48 26 44 C22 41 18 40 16 42 Z"
              fill="#FDFBF7"
            />
          </g>

          {/* Ears Group */}
          <g id="kairo-ears" className={animated ? 'kairo-ears' : ''}>
            {/* Left Ear */}
            <path
              d="M27 46 L18 16 C18 16 26 22 37 32 Z"
              fill="url(#kairo-fur)"
            />
            {/* Left Ear Tip (Dark) */}
            <path
              d="M18 16 L22 24 L19 22 Z"
              fill="#261E19"
            />
            {/* Left Inner Ear (Fluff) */}
            <path
              d="M25 40 L21 23 C23 27 28 32 32 35 Z"
              fill="url(#kairo-ear-inner)"
            />

            {/* Right Ear */}
            <path
              d="M73 46 L82 16 C82 16 74 22 63 32 Z"
              fill="url(#kairo-fur)"
            />
            {/* Right Ear Tip (Dark) */}
            <path
              d="M82 16 L78 24 L81 22 Z"
              fill="#261E19"
            />
            {/* Right Inner Ear (Fluff) */}
            <path
              d="M75 40 L79 23 C77 27 72 32 68 35 Z"
              fill="url(#kairo-ear-inner)"
            />
          </g>

          {/* Head Base */}
          <path
            d="M28 44 C28 32 38 28 50 28 C62 28 72 32 72 44 C72 58 64 68 50 68 C36 68 28 58 28 44 Z"
            fill="url(#kairo-fur)"
          />

          {/* Cheek Tufts & Face Muzzle (Cream Fur) */}
          <path
            d="M32 50 C26 53 24 60 30 63 C36 66 42 67 50 67 C58 67 64 66 70 63 C76 60 74 53 68 50 C62 55 58 57 50 57 C42 57 38 55 32 50 Z"
            fill="#FFFBF5"
          />

          {/* Sweatband for FOCUS pose */}
          {pose === 'focus' && (
            <g id="kairo-sweatband">
              <path
                d="M29 36 C34 33 42 32 50 32 C58 32 66 33 71 36 L70 41 C65 38 58 37 50 37 C42 37 35 38 30 41 Z"
                fill="var(--acc, #D14615)"
              />
              <circle cx="50" cy="36.5" r="2" fill="#1E1815" />
            </g>
          )}

          {/* Eyes */}
          {pose === 'rest' ? (
            // Relaxed / Sleeping Eyes (happy curved arcs)
            <g id="kairo-eyes-rest">
              <path d="M38 46 Q43 51 47 46" stroke="#2B1A0E" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M53 46 Q57 51 62 46" stroke="#2B1A0E" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            // Expressive Amber Eyes
            <g id="kairo-eyes">
              {/* Left Eye */}
              <ellipse cx="42" cy="45" rx="4.5" ry="5.5" fill="#181410" />
              <ellipse cx="42" cy="45.5" rx="3.5" ry="4.5" fill="#F59E0B" />
              <circle cx="42" cy="45" r="2.5" fill="#181410" />
              <circle cx="43.5" cy="43.5" r="1.3" fill="#FFFFFF" />
              <circle cx="41" cy="47" r="0.6" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="58" cy="45" rx="4.5" ry="5.5" fill="#181410" />
              <ellipse cx="58" cy="45.5" rx="3.5" ry="4.5" fill="#F59E0B" />
              <circle cx="58" cy="45" r="2.5" fill="#181410" />
              <circle cx="59.5" cy="43.5" r="1.3" fill="#FFFFFF" />
              <circle cx="57" cy="47" r="0.6" fill="#FFFFFF" />

              {/* Eyebrows */}
              {pose === 'focus' ? (
                <>
                  <path d="M37 39 L47 41" stroke="#2B1A0E" strokeWidth="2" strokeLinecap="round" />
                  <path d="M63 39 L53 41" stroke="#2B1A0E" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M37 39 Q42 37 46 39" stroke="#2B1A0E" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M54 39 Q58 37 63 39" stroke="#2B1A0E" strokeWidth="1.8" strokeLinecap="round" />
                </>
              )}
            </g>
          )}

          {/* Cute Fox Nose */}
          <path
            d="M48 54 C48 53 52 53 52 54 L50.5 56.5 C50.2 57 49.8 57 49.5 56.5 Z"
            fill="#121614"
          />

          {/* Mouth */}
          {pose === 'celebrate' || pose === 'trophy' ? (
            // Big Happy Smile
            <path
              d="M46 58 Q50 63 54 58"
              stroke="#2B1A0E"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="#D94B4B"
            />
          ) : (
            // Confident smirk
            <path
              d="M47 58 Q50 60 53 58"
              stroke="#2B1A0E"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}

          {/* Charcoal Gym Training Jacket */}
          <g id="kairo-jacket">
            {/* Body */}
            <path
              d="M30 67 C30 67 36 64 50 64 C64 64 70 67 70 67 L75 92 C75 94 72 96 68 96 L32 96 C28 96 25 94 25 92 Z"
              fill="url(#kairo-jacket)"
            />

            {/* Coral Collar Trim */}
            <path
              d="M34 66 L42 74 L50 67 L58 74 L66 66"
              stroke="var(--acc, #D14615)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Coral Zipper Track */}
            <line
              x1="50"
              y1="67"
              x2="50"
              y2="95"
              stroke="var(--acc, #D14615)"
              strokeWidth="1.8"
              strokeDasharray="2 1.5"
            />

            {/* Jacket Shoulder Stripes */}
            <line x1="28" y1="74" x2="33" y2="84" stroke="var(--acc, #D14615)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="72" y1="74" x2="67" y2="84" stroke="var(--acc, #D14615)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Pose Overlays / Accessories */}

          {/* WELCOME / IDLE POSE: Waving hand */}
          {pose === 'welcome' && (
            <g id="pose-welcome">
              <circle cx="75" cy="62" r="5" fill="url(#kairo-fur)" />
              <path d="M73 59 L75 56" stroke="#2B1A0E" strokeWidth="1" strokeLinecap="round" />
              <path d="M75 58 L78 56" stroke="#2B1A0E" strokeWidth="1" strokeLinecap="round" />
              {/* Little wave lines */}
              <path d="M82 56 Q85 59 82 62" stroke="var(--acc, #D14615)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {/* ENCOURAGE POSE: Fist Pump with Spark */}
          {pose === 'encourage' && (
            <g id="pose-encourage">
              <circle cx="76" cy="55" r="6" fill="url(#kairo-fur)" stroke="var(--acc, #D14615)" strokeWidth="1.5" />
              {/* Energy Sparks */}
              <path d="M76 43 L76 46" stroke="var(--acc, #D14615)" strokeWidth="2" strokeLinecap="round" />
              <path d="M83 48 L80 50" stroke="var(--acc, #D14615)" strokeWidth="2" strokeLinecap="round" />
              <path d="M85 56 L82 56" stroke="var(--acc, #D14615)" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* CELEBRATE POSE: Gold Victory Star & Confetti */}
          {pose === 'celebrate' && (
            <g id="pose-celebrate">
              {/* Both arms raised */}
              <circle cx="24" cy="54" r="5" fill="url(#kairo-fur)" />
              <circle cx="76" cy="54" r="5" fill="url(#kairo-fur)" />
              {/* Floating Star */}
              <path
                d="M50 14 L52 19 L57 19 L53 22 L55 27 L50 24 L45 27 L47 22 L43 19 L48 19 Z"
                fill="#F59E0B"
                stroke="#FFE082"
                strokeWidth="1"
              />
              {/* Confetti dots */}
              <circle cx="36" cy="18" r="1.5" fill="var(--acc, #D14615)" />
              <circle cx="64" cy="18" r="1.5" fill="var(--acc, #D14615)" />
              <circle cx="30" cy="26" r="1" fill="#F59E0B" />
              <circle cx="70" cy="26" r="1" fill="#38BDF8" />
            </g>
          )}

          {/* TROPHY POSE: Holding Gold Trophy */}
          {pose === 'trophy' && (
            <g id="pose-trophy">
              <path
                d="M44 68 L56 68 L54 78 Q50 82 46 78 Z"
                fill="#F59E0B"
                stroke="#FFE082"
                strokeWidth="1"
              />
              <path d="M47 80 L53 80 L53 84 L47 84 Z" fill="#D97706" />
              <rect x="44" y="84" width="12" height="3" rx="1" fill="#78350F" />
              {/* Trophy handles */}
              <path d="M44 71 C40 71 40 76 44 76" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
              <path d="M56 71 C60 71 60 76 56 76" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* TIMER POSE: Holding Stopwatch */}
          {pose === 'timer' && (
            <g id="pose-timer">
              <circle cx="74" cy="68" r="8" fill="#1E1815" stroke="var(--acc, #D14615)" strokeWidth="1.8" />
              <circle cx="74" cy="68" r="5" fill="#382B25" />
              <line x1="74" y1="68" x2="74" y2="65" stroke="var(--acc, #D14615)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="74" y1="68" x2="77" y2="68" stroke="var(--acc, #D14615)" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="73" y="58" width="2" height="2" fill="var(--acc, #D14615)" />
            </g>
          )}

          {/* EMPTY POSE: Holding Clipboard Guide */}
          {pose === 'empty' && (
            <g id="pose-empty">
              <rect x="68" y="62" width="12" height="16" rx="2" fill="#382B25" stroke="var(--acc, #D14615)" strokeWidth="1.2" />
              <rect x="71" y="60" width="6" height="3" rx="1" fill="#71717A" />
              <line x1="71" y1="67" x2="77" y2="67" stroke="#A1A1AA" strokeWidth="1" />
              <line x1="71" y1="71" x2="77" y2="71" stroke="#A1A1AA" strokeWidth="1" />
              <line x1="71" y1="75" x2="75" y2="75" stroke="#A1A1AA" strokeWidth="1" />
            </g>
          )}
        </svg>
      </div>

      {message && (
        <div className="kairo-bubble">
          {tag && (
            <div className="kairo-tag">
              <span className="kairo-tag-dot" />
              {tag}
            </div>
          )}
          <div className="kairo-message-text">{message}</div>
        </div>
      )}
    </div>
  );
}
