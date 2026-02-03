import * as React from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  width = variant === 'full' ? 200 : 40,
  height = variant === 'full' ? 40 : 40,
  ...props
}) => {
  if (variant === 'icon') {
    // Icon version - briefcase icon
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Briefcase body */}
        <rect x="4" y="12" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Handle */}
        <path d="M14 12V9C14 7.34315 15.3431 6 17 6H23C24.6569 6 26 7.34315 26 9V12" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Center clasp */}
        <rect x="17" y="20" width="6" height="4" rx="1" fill="currentColor" />
        {/* Divider line */}
        <line x1="4" y1="22" x2="36" y2="22" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  // Full logo with text
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Briefcase Icon */}
      <g>
        {/* Briefcase body */}
        <rect x="4" y="12" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Handle */}
        <path d="M14 12V9C14 7.34315 15.3431 6 17 6H23C24.6569 6 26 7.34315 26 9V12" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Center clasp */}
        <rect x="17" y="20" width="6" height="4" rx="1" fill="currentColor" />
        {/* Divider line */}
        <line x1="4" y1="22" x2="36" y2="22" stroke="currentColor" strokeWidth="2" />
      </g>

      {/* Text */}
      <text
        x="44"
        y="24"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="14"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="0.02em"
      >
        The Indian Startup
      </text>
    </svg>
  );
};

// Alternative minimalist logo with briefcase icon
export const LogoMinimal: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 150,
  height = 30,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Small briefcase icon */}
      <g>
        <rect x="2" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 8V6C8 5.17157 8.67157 4.5 9.5 4.5H14.5C15.3284 4.5 16 5.17157 16 6V8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="10" y="13" width="4" height="3" rx="0.5" fill="currentColor" />
        <line x1="2" y1="14.5" x2="22" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text
        x="28"
        y="19"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="11"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="0.02em"
      >
        The Indian Startup
      </text>
    </svg>
  );
};