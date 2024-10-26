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
      boxShadow: {
        spread: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      },
      textColor: {
        main: "#000000",
        secondary: "#696969",
        hover: "#000000",
        "dark-main": "#ffffff",
        "dark-secondary": "#838383",
        "dark-hover": "#ffffff",
      },
      backgroundColor: {
        main: "#ffffff",
        secondary: "",
        hover: "#f1f1f1",
        "dark-main": "#121212",
        "dark-secondary": "#2d2d2d",
        "dark-hover": "#242424",
      },
      borderColor: {
        main: "#e9e9e9",
        hover: "",
        "dark-main": "#272727",
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
