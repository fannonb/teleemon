import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: { max: "767px" },
      sm: { min: "768px", max: "992px" },
      md: { min: "993px", max: "1024px" },
      lg: { min: "1025px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": { min: "1536px" },
    },
    extend: {
      colors: {
        teleemon: {
          "electric-blue": "rgba(0,255,255,1)",
          "blue-100": "rgba(226,248,255,1)",
          "blue-200": "rgba(174,206,235,1)",
          "blue-400": "rgba(122,164,215,1)",
          "blue-500": "rgba(96,143,205,1)",
          "blue-700": "rgba(44,101,185,1)",
          "blue-900": "rgba(13,51,110,1)",
          "blue-1000": "rgba(6,22,71,1)",
          "purple-100": "rgba(233,225,252,1)",
          "purple-200": "rgba(183,161,243,1)",
          "purple-400": "rgba(133,97,232,1)",
          "purple-500": "rgba(110,72,205,1)",
          "purple-600": "rgba(91,55,173,1)",
          "purple-700": "rgba(71,48,170,1)",
          "purple-800": "rgba(59,40,143,1)",
          "purple-900": "rgba(44,30,110,1)",
          "purple-1000": "rgba(30,20,77,1)",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
