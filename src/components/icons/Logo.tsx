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
    // Icon version - just the typewriter/document icon
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect x="5" y="8" width="30" height="24" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="10" y="13" width="20" height="2" fill="currentColor" />
        <rect x="10" y="18" width="15" height="2" fill="currentColor" />
        <rect x="10" y="23" width="18" height="2" fill="currentColor" />
        <rect x="10" y="28" width="12" height="2" fill="currentColor" />
        <rect x="15" y="3" width="10" height="5" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="17" y="5" width="6" height="3" fill="currentColor" />
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
      {/* Icon */}
      <g>
        <rect x="5" y="8" width="30" height="24" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="10" y="13" width="20" height="2" fill="currentColor" />
        <rect x="10" y="18" width="15" height="2" fill="currentColor" />
        <rect x="10" y="23" width="18" height="2" fill="currentColor" />
        <rect x="10" y="28" width="12" height="2" fill="currentColor" />
        <rect x="15" y="3" width="10" height="5" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="17" y="5" width="6" height="3" fill="currentColor" />
      </g>
      
      {/* Text */}
      <text
        x="40"
        y="24"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="16"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="0.05em"
      >
        THE INDIAN STARTUP
      </text>
    </svg>
  );
};

// Alternative minimalist logo
export const LogoMinimal: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 120,
  height = 30,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="0"
        y="20"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        TIS
      </text>
      <rect x="35" y="10" width="85" height="2" fill="currentColor" />
      <text
        x="35"
        y="28"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="0.15em"
      >
        THE INDIAN STARTUP
      </text>
    </svg>
  );
};