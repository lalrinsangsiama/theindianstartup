import type { Config } from "tailwindcss"
import { 
  colors, 
  typography, 
  spacing, 
  borderRadius, 
  shadows, 
  breakpoints,
  transitions,
  zIndex 
} from './src/styles/design-tokens'

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    // Use our design tokens
    colors: {
      // Base colors
      black: colors.black,
      white: colors.white,
      transparent: 'transparent',
      current: 'currentColor',
      
      // Gray scale
      gray: colors.gray,
      
      // Semantic colors
      background: 'rgb(var(--background) / <alpha-value>)',
      foreground: 'rgb(var(--foreground) / <alpha-value>)',
      border: 'rgb(var(--border) / <alpha-value>)',
      muted: {
        DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
        foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
      },
      
      // Accent colors
      success: colors.accent.success,
      error: colors.accent.error,
      warning: colors.accent.warning,
      
      // Legacy colors (for compatibility)
      primary: {
        DEFAULT: colors.black,
        foreground: colors.white,
      },
      secondary: {
        DEFAULT: colors.gray[100],
        foreground: colors.black,
      },
      destructive: {
        DEFAULT: colors.accent.error,
        foreground: colors.white,
      },
      accent: {
        DEFAULT: colors.accent.success,
        foreground: colors.white,
      },
    },
    
    spacing,
    
    fontSize: typography.sizes,
    
    lineHeight: typography.lineHeights,
    
    fontWeight: typography.weights,
    
    fontFamily: {
      heading: [typography.fonts.heading, 'monospace'],
      body: [typography.fonts.body, 'sans-serif'],
      mono: [typography.fonts.mono, 'monospace'],
      sans: [typography.fonts.body, 'sans-serif'],
    },
    
    borderRadius,
    
    boxShadow: shadows,
    
    screens: breakpoints,
    
    transitionDuration: transitions,
    
    zIndex,
    
    extend: {
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { 
            opacity: "0",
            transform: "translateY(10px)"
          },
          to: { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "fade-down": {
          from: { 
            opacity: "0",
            transform: "translateY(-10px)"
          },
          to: { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "scale-in": {
          from: { 
            opacity: "0",
            transform: "scale(0.95)"
          },
          to: { 
            opacity: "1",
            transform: "scale(1)"
          },
        },
        "slide-in-right": {
          from: { 
            transform: "translateX(100%)"
          },
          to: { 
            transform: "translateX(0)"
          },
        },
        "slide-in-left": {
          from: { 
            transform: "translateX(-100%)"
          },
          to: { 
            transform: "translateX(0)"
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "fade-up": "fade-up 300ms ease-out",
        "fade-down": "fade-down 300ms ease-out",
        "scale-in": "scale-in 200ms ease-out",
        "slide-in-right": "slide-in-right 300ms ease-out",
        "slide-in-left": "slide-in-left 300ms ease-out",
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-out",
        "spin": "spin 1s linear infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        'typewriter-pattern': 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23f5f5f5" fill-opacity="0.5"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for typewriter cursor
    function({ addUtilities }: any) {
      addUtilities({
        '.typewriter-cursor::after': {
          content: '"_"',
          animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      })
    },
  ],
} satisfies Config

export default config