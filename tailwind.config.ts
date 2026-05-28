import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111317",
        foreground: "#e2e2e8",
        primary: {
          DEFAULT: "#ffb59c",
          foreground: "#5c1900",
          container: "#ff5f1f",
          onContainer: "#561700",
        },
        secondary: {
          DEFAULT: "#d7ffc5",
          foreground: "#053900",
          container: "#2ff801",
          onContainer: "#0f6d00",
        },
        tertiary: {
          DEFAULT: "#bbc7dd",
          foreground: "#253142",
          container: "#8995aa",
          onContainer: "#222e3f",
        },
        surface: {
          DEFAULT: "#111317",
          dim: "#111317",
          bright: "#37393e",
          container: {
            lowest: "#0c0e12",
            low: "#1a1c20",
            DEFAULT: "#1e2024",
            high: "#282a2e",
            highest: "#333539",
          },
          variant: "#333539",
          on: "#e2e2e8",
          onVariant: "#e3bfb3",
        },
        outline: "#aa897f",
        outlineVariant: "#5b4138",
        error: {
          DEFAULT: "#ffb4ab",
          foreground: "#690005",
          container: "#93000a",
          onContainer: "#ffdad6",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
        xl: "0.75rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Geist", "monospace"],
      },
      spacing: {
        base: "8px",
        "gutter-mobile": "16px",
        "gutter-desktop": "24px",
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
