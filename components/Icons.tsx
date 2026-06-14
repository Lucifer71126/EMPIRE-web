type IconProps = {
  className?: string;
};

export function AutoIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.66-5.66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.7 3.6v3.1h-3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.3 20.4v-3.1h3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SunIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.8v2.1M12 19.1v2.1M4.4 4.4l1.5 1.5M18.1 18.1l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.4 19.6l1.5-1.5M18.1 5.9l1.5-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MoonIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M19.5 14.7A7.8 7.8 0 0 1 9.3 4.5 8.4 8.4 0 1 0 19.5 14.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LanguageIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 5h9M8.5 3v2M10.7 5c-.9 3.2-3 5.7-6.2 7.5M6.7 8.2c1 1.8 2.4 3.2 4.4 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 21l1.2-3.1m0 0L17.4 11l2.8 6.9m-5.5 0h5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServiceIcon({ index, className = "h-8 w-8" }: IconProps & { index: number }) {
  const icons = [
    <path key="identity" d="M12 3.5 5.2 6.2v5.1c0 4.4 2.8 7.5 6.8 9.2 4-1.7 6.8-4.8 6.8-9.2V6.2L12 3.5Zm0 7.8a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm-3.7 5.1a4.1 4.1 0 0 1 7.4 0" />,
    <path key="education" d="m4 8 8-4 8 4-8 4-8-4Zm3 3.1v4.1c1.4 1.6 3.1 2.4 5 2.4s3.6-.8 5-2.4v-4.1M20 8v5.2" />,
    <path key="wealth" d="M12 3.5 5.2 6.2v5.1c0 4.4 2.8 7.5 6.8 9.2 4-1.7 6.8-4.8 6.8-9.2V6.2L12 3.5Zm0 4v9M9.4 9.5c.6-.7 1.4-1 2.6-1 1.5 0 2.5.7 2.5 1.8 0 2.6-5 1.2-5 3.8 0 1.1 1 1.9 2.6 1.9 1.1 0 2-.4 2.7-1.1" />,
    <path key="property" d="M4.5 19.5h15M6 19.5V9.8l6-5.2 6 5.2v9.7M9.5 19.5v-6h5v6M6 11.2h12" />,
    <path key="legacy" d="M5.5 18.5V9.4l6.5-4 6.5 4v9.1M8.5 16.2h7M9 12.5h6M10.2 9.1h3.6M5 18.5h14" />,
    <path key="business" d="M4 18.5h16M6.2 15.8V8.5h4.3v7.3M13.5 15.8V5.5h4.3v10.3M8.4 8.5V6.2h7.2" />
  ];

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[index % icons.length]}</g>
    </svg>
  );
}

export function TrustIcon({ index, className = "h-7 w-7" }: IconProps & { index: number }) {
  const icons = [
    <path key="hk" d="M4 18.5h16M6 18.5V8l3-2 3 2v10.5M12 18.5V6.5l3-2 3 2v12M8 11h1M8 14h1M15 10h1M15 13h1" />,
    <path key="network" d="M12 5.2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-6.5 11a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Zm13 0a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6ZM9.8 10.1 6.7 16.3M14.2 10.1l3.1 6.2" />,
    <path key="platform" d="M5 6.5h14v10H5zM8 20h8M10 16.5v3.5M14 16.5v3.5M8.5 10.5h2M13.5 10.5h2M8.5 13.2h7" />
  ];

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[index % icons.length]}</g>
    </svg>
  );
}
