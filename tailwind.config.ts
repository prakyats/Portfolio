import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Outfit'", "system-ui", "sans-serif"],
        display: ["'Outfit'", "system-ui", "sans-serif"],
        mono: ["monospace"],
      },
      colors: {
        bg: "#F0F0F0",
        foreground: "#121212",
        "bauhaus-red": "#D02020",
        "bauhaus-blue": "#1040C0",
        "bauhaus-yellow": "#F0C020",
        "bauhaus-black": "#121212",
        "bauhaus-offwhite": "#F0F0F0",
        border: "#121212",
        muted: "#E0E0E0",
        // Keep existing keys but map to new values for compatibility during transition
        text: "#121212",
        accent: "#D02020",
      },
      borderRadius: {
        "none": "0px",
        "full": "9999px",
      },
      boxShadow: {
        "bauhaus-s": "4px 4px 0px 0px #121212",
        "bauhaus-m": "6px 6px 0px 0px #121212",
        "bauhaus-l": "8px 8px 0px 0px #121212",
      },
      transitionDuration: {
        "200": "200ms",
        "300": "300ms",
      },
      transitionTimingFunction: {
        "bauhaus": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
