import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        main: "#000000",
        secondary: "#696969",
        hover: "#000000",
        "dark-main": "#ffffff",
        "dark-secondary": "#ffffff",
        "dark-hover": "#ffffff",
      },
      backgroundColor: {
        main: "#ffffff",
        secondary: "",
        hover: "#f1f1f1",
        "dark-main": "",
        "dark-secondary": "",
        "dark-hover": "",
      },
      borderColor: {
        main: "#e9e9e9",
        hover: "",
        "dark-main": "",
        "dark-hover": "",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
