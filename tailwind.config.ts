import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // JDM Theme Colors
        red: {
          DEFAULT: "hsl(0 72% 51%)",
          50: "hsl(0 86% 97%)",
          100: "hsl(0 93% 94%)",
          200: "hsl(0 96% 89%)",
          300: "hsl(0 94% 82%)",
          400: "hsl(0 91% 71%)",
          500: "hsl(0 72% 51%)",
          600: "hsl(0 84% 60%)",
          700: "hsl(0 70% 50%)",
          800: "hsl(0 65% 45%)",
          900: "hsl(0 63% 31%)",
        },
        orange: {
          DEFAULT: "hsl(24 95% 53%)",
          50: "hsl(24 100% 97%)",
          100: "hsl(24 100% 94%)",
          200: "hsl(24 100% 88%)",
          300: "hsl(24 100% 79%)",
          400: "hsl(24 98% 64%)",
          500: "hsl(24 95% 53%)",
          600: "hsl(24 90% 48%)",
          700: "hsl(24 85% 43%)",
          800: "hsl(24 80% 38%)",
          900: "hsl(24 75% 28%)",
        },
        green: {
          DEFAULT: "hsl(142 71% 45%)",
          50: "hsl(142 76% 97%)",
          100: "hsl(142 77% 94%)",
          200: "hsl(142 76% 88%)",
          300: "hsl(142 77% 78%)",
          400: "hsl(142 69% 58%)",
          500: "hsl(142 71% 45%)",
          600: "hsl(142 76% 36%)",
          700: "hsl(142 72% 29%)",
          800: "hsl(142 64% 24%)",
          900: "hsl(142 61% 20%)",
        },
        blue: {
          DEFAULT: "hsl(221 83% 53%)",
          50: "hsl(221 100% 97%)",
          100: "hsl(221 96% 94%)",
          200: "hsl(221 96% 89%)",
          300: "hsl(221 96% 78%)",
          400: "hsl(221 89% 64%)",
          500: "hsl(221 83% 53%)",
          600: "hsl(221 83% 48%)",
          700: "hsl(221 78% 43%)",
          800: "hsl(221 73% 38%)",
          900: "hsl(221 68% 28%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
