import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        text: "hsl(var(--text))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        "stroke-bright": "hsl(var(--stroke-bright))",
        accent: "hsl(var(--accent))",
        gold: "hsl(var(--gold))",
        teal: "hsl(var(--teal))",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
