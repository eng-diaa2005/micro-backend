// SVG artwork taken from the original design
export const Waves = ({ spin = true }) => (
<svg aria-hidden="true" className="waves" preserveAspectRatio="none" viewBox="0 0 248 850">
<path className="wave-layer-1" d="M248 0C170 30 180 120 248 160V0Z" fill="#9fc0f2" opacity=".4"></path>
<path className="wave-layer-2" d="M0 580C80 540 160 630 248 570V850H0Z" fill="#1b53b3" opacity=".55"></path>
<path className="wave-layer-3" d="M0 670C90 630 160 710 248 660V850H0Z" fill="#071f45" opacity=".85"></path>
</svg>
);

export const Logo = ({ spin = true }) => (
<svg className="logo-icon" fill="none" height="68" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 86 70" width="84">
<path d="M6 34L43 6l37 28M14 30v34h58V30"></path>
<g stroke="#6fc3ff" strokeWidth="2.4">
<circle cx="43" cy="38" fill="#6fc3ff" r="3"></circle>
<circle cx="31" cy="46" fill="#6fc3ff" r="2.5"></circle>
<circle cx="55" cy="46" fill="#6fc3ff" r="2.5"></circle>
<circle cx="43" cy="53" fill="#6fc3ff" r="2.5"></circle>
<path d="M43 41v9M34 44l6-4M52 44l-6-4"></path>
</g>
</svg>
);

export const SideArt = ({ spin = true }) => (
<svg className="wifi-pulse" height="110" viewBox="0 0 170 120" width="160">
<g fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="4">
<path d="M95 22a26 26 0 0138 0"></path>
<path d="M103 31a15 15 0 0121 0"></path>
</g>
<circle cx="113" cy="40" fill="#ffffff" r="3.5"></circle>
<path d="M20 96V58L56 30l36 28v38z" fill="#1e5cb7"></path>
<path d="M14 60L56 26l42 34" fill="none" stroke="#3783e7" strokeLinecap="round" strokeWidth="6"></path>
<rect fill="#0f3a7d" height="30" rx="3" width="28" x="42" y="66"></rect>
<path d="M56 66v30M42 81h28" stroke="#6fa4ff" strokeWidth="2"></path>
<rect fill="#1e5cb7" height="14" width="9" x="24" y="36"></rect>
</svg>
);

export const GateScene = ({ spin = true }) => (
<svg height="135" viewBox="0 0 280 135" width="100%">
<defs>
<pattern height="8" id="barrierStripe" patternUnits="userSpaceOnUse" width="16">
<rect fill="#ffffff" height="8" width="16"></rect>
<rect fill="#123a7a" height="8" width="8"></rect>
</pattern>
</defs>
{/* Ultrasonic Sensor on top */}
<rect fill="#0b2a5b" height="20" rx="5" width="50" x="115" y="4"></rect>
<circle cx="128" cy="14" fill="#38bdf8" r="6" stroke="#ffffff" strokeWidth="1.5"></circle>
<circle cx="152" cy="14" fill="#38bdf8" r="6" stroke="#ffffff" strokeWidth="1.5"></circle>
{/* Sonar Waves animation */}
<g id="sonarWavesGroup">
<path className="sonar-ring" d="M124 28q16 8 32 0"></path>
<path className="sonar-ring" d="M116 36q24 12 48 0"></path>
<path className="sonar-ring" d="M108 44q32 16 64 0"></path>
</g>
{/* Parking Barrier Gate */}
<rect fill="#0b2a5b" height="10" rx="2" width="36" x="12" y="112"></rect>
<rect fill="#123a7a" height="50" rx="3" width="16" x="22" y="65"></rect>
<rect fill="#f59e0b" height="14" rx="2" width="12" x="24" y="52"></rect>
{/* Moving Arm */}
<g className="gate-arm" id="gateArmGroup">
<rect fill="url(#barrierStripe)" height="10" rx="3" stroke="#123a7a" width="130" x="30" y="70"></rect>
</g>
{/* Blue Car Graphic */}
<g transform="translate(180, 52)">
<path d="M4 42Q4 32 14 28L22 12Q25 6 32 6H58Q65 6 68 12L76 28Q86 32 86 42V60Q86 64 82 64H8Q4 64 4 60Z" fill="#1f6fd0"></path>
<path d="M26 26L32 12H58L64 26Z" fill="#cbe2ff"></path>
<rect fill="#eaf6ff" height="8" rx="4" width="16" x="8" y="36"></rect>
<rect fill="#eaf6ff" height="8" rx="4" width="16" x="66" y="36"></rect>
<rect fill="#0c3575" height="8" rx="2" width="30" x="30" y="42"></rect>
<rect fill="#0b2a5b" height="8" rx="3" width="14" x="10" y="60"></rect>
<rect fill="#0b2a5b" height="8" rx="3" width="14" x="66" y="60"></rect>
</g>
</svg>
);

export const Thermometer = ({ spin = true }) => (
<svg height="66" viewBox="0 0 40 78" width="32">
<rect fill="#e8f3ff" height="52" rx="8" stroke="#0e8f8f" strokeWidth="4" width="16" x="12" y="3"></rect>
<rect fill="#0e8f8f" height="34" rx="3" width="6" x="17" y="24"></rect>
<circle cx="20" cy="60" fill="#0e8f8f" r="12" stroke="#0e8f8f" strokeWidth="2"></circle>
<circle cx="16" cy="56" fill="#7fe0d8" r="3"></circle>
<g stroke="#0e8f8f" strokeLinecap="round" strokeWidth="2.5"><path d="M32 10h5M32 20h5M32 30h5"></path></g>
</svg>
);

export const FanGraphic = ({ spin = true }) => (
<svg height="110" viewBox="0 0 130 145" width="100">
<g fill="none" stroke="#38bdf8" strokeLinecap="round" strokeWidth="3">
<path d="M110 14q14 8 16 24"></path>
<path d="M102 6q22 10 26 34" opacity=".6"></path>
</g>
<circle cx="62" cy="68" fill="#0f326e" r="52" stroke="#0b2a5b" strokeWidth="6"></circle>
<circle cx="62" cy="68" fill="none" opacity=".7" r="52" stroke="#4c82d6" strokeWidth="1.5"></circle>
<circle cx="62" cy="68" fill="none" r="40" stroke="#2f5fae" strokeWidth="2"></circle>
<circle cx="62" cy="68" fill="none" r="27" stroke="#2f5fae" strokeWidth="2"></circle>
{/* Spinning Blades */}
<g className={spin ? 'fan-spinning' : 'fan-stopped'} fill="#0a2352" stroke="#5a8fe0" strokeWidth="1">
<ellipse cx="62" cy="42" rx="12" ry="25"></ellipse>
<ellipse cx="62" cy="42" rx="12" ry="25" transform="rotate(90 62 68)"></ellipse>
<ellipse cx="62" cy="42" rx="12" ry="25" transform="rotate(180 62 68)"></ellipse>
<ellipse cx="62" cy="42" rx="12" ry="25" transform="rotate(270 62 68)"></ellipse>
</g>
<circle cx="62" cy="68" fill="#173f84" r="9" stroke="#6aa3f0"></circle>
<rect fill="#0b2a5b" height="14" width="14" x="55" y="118"></rect>
<rect fill="#0b2a5b" height="10" rx="5" width="64" x="30" y="130"></rect>
</svg>
);

export const StatusDoor = ({ spin = true }) => (
<svg height="42" viewBox="0 0 24 30" width="34">
<path d="M5 2h12a1.5 1.5 0 011.5 1.5V28H5z" fill="#0b2a5b"></path>
<circle cx="15" cy="16" fill="#ffffff" r="1.2"></circle>
<rect fill="#0b2a5b" height="2" rx="1" width="20" x="2" y="27.5"></rect>
</svg>
);

export const StatusGate = ({ spin = true }) => (
<svg height="38" viewBox="0 0 48 40" width="46">
<path d="M4 38V4M44 38V4" fill="none" stroke="#0b2a5b" strokeLinecap="round" strokeWidth="3.2"></path>
<rect fill="#0b2a5b" height="7" rx="1.5" width="44" x="2" y="5"></rect>
<path d="M9 7l5 3M17 7l5 3M25 7l5 3M33 7l5 3" stroke="#fff" strokeWidth="2"></path>
<g fill="none" stroke="#0b2a5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6"><path d="M13 33v-6l3-6h16l3 6v6zM13 33v3h4v-3M31 33v3h4v-3"></path></g>
</svg>
);

export const MiniFan = ({ spin = true }) => (
<svg height="38" viewBox="0 0 24 24" width="38">
<g className={spin ? 'fan-spinning' : 'fan-stopped'} fill="#0b2a5b">
<path d="M12 12C11 7 12 2.5 15.5 3C19 3.8 16.5 9.5 12 12Z"></path>
<path d="M12 12C17 11 21.5 12 21 15.5C20.2 19 14.5 16.5 12 12Z"></path>
<path d="M12 12C13 17 12 21.5 8.5 21C5 20.2 7.5 14.5 12 12Z"></path>
<path d="M12 12C7 13 2.5 12 3 8.5C3.8 5 9.5 7.5 12 12Z"></path>
<circle cx="12" cy="12" fill="#ffffff" r="2.4"></circle>
<circle cx="12" cy="12" r="1.3"></circle>
</g>
</svg>
);

