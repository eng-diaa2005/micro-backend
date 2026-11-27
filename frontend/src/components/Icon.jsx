const ICONS = {
  home: <path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6" />,
  gear: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  logs: <path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h8" />,
  info: <><circle cx="12" cy="12" r="10" /><path d="M12 11v6M12 7.5v.5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M16 16l5 5" /></>,
  bell: <path d="M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 21h4" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  door: <path d="M6 3h10v18H6zM4 21h16M13 12v.5" />,
  car: <path d="M4 16v-4l2-5h12l2 5v4zM4 16v3h3v-3M17 16v3h3v-3M7 13h.5M16.5 13h.5" />,
  gate: <path d="M3 21V7M3 11h18M3 15h18M21 7v14M8 11v4M14 11v4" />,
  fan: <><circle cx="12" cy="12" r="2" /><path d="M12 10V2M14 12h8M12 14v8M10 12H2" /></>,
  thermo: <path d="M10 14V5a2 2 0 014 0v9a4 4 0 11-4 0z" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  power: <path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  chart: <path d="M18 20V10M12 20V4M6 20v-6" />,
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
  back: <path d="M19 12H5M12 19l-7-7 7-7" />,
  wifi: <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  logout: <path d="M9 21H5V3h4M16 17l5-5-5-5M21 12H9" />,
  eye: <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeoff: <path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c7 0 11 7 11 7a17 17 0 01-3.2 4M6.6 6.6A17 17 0 001 12s4 7 11 7a10 10 0 005.4-1.6M9.9 9.9a3 3 0 004.2 4.2" />,
  pulse: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
};

export default function Icon({ name, size = 22, stroke = 'currentColor', sw = 2, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {ICONS[name]}
    </svg>
  );
}
