import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      colors: {
       
        white: "#fff",
        whitesmoke: "#f6f6f6",
        darkslategray: "#3b3b3b",
        "primary-dark": "#1d1c20",
        gray: {
          100: "#1d1f23",
          200: "rgba(255, 255, 255, 0)",
        },
      },
      fontFamily: {
        "dm-sans": "'DM Sans'",
        garet: ['Garet', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        "45xl": "64px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
    },
    fontSize: {
      lg: "18px",
      "mid-6": "17.6px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

export default config;