import type { Config } from "tailwindcss";

// Design tokens — see README.md "Design System" section for rationale.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A", // dark chrome only now — header, mobile nav, footer, WhatsApp button
        graphite: "#1C1C1C", // dark surface, used only within dark chrome
        porcelain: "#F7F6F2", // text/icons on dark chrome
        canvas: "#FBFBFD", // primary page background (Apple's actual white)
        canvasAlt: "#F5F5F7", // alternating section background (Apple's light grey)
        mist: "#E7E4DD", // legacy hairline token, kept for compatibility
        gold: {
          DEFAULT: "#C9A24B", // muted architectural gold — the one accent
          light: "#E3C77A",
          dark: "#9C7B33",
        },
        ink: "#1D1D1F", // primary body text on light surfaces (Apple's near-black)
        inkMuted: "#6E6E73", // secondary/caption text on light surfaces
      },
      fontFamily: {
        // Headlines now use the same neutral sans as body copy, at heavy
        // weight with tight tracking — this is the Apple typographic
        // approach (one honest sans family, weight/size/spacing do the
        // work) rather than a separate display serif.
        display: ["var(--font-sans)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "700" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "16px",
        xl: "24px",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
      },
    },
  },
  plugins: [],
};

export default config;
