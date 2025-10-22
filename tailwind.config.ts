import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      colors: {
        "brand-orange": "#E85002",
        black: "#000000",
        white: "#F9F9F9",
        gray: {
          DEFAULT: "#646464",
          light: "#A7A7A7",
          dark: "#333333",
        },
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(120deg, #000 0%, #C10801 35%, #F16001 70%, #D9C3AB 100%)",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero-h1": "clamp(32px, 6vw, 120px)",
        "hero-h1-sm": "clamp(24px, 8vw, 48px)",
        "hero-h1-md": "clamp(40px, 7vw, 80px)",
        "hero-h1-lg": "clamp(56px, 6vw, 120px)",
        "hero-h1-xl": "clamp(64px, 5vw, 140px)",
      },
      spacing: {
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
    },
  },
  plugins: [],
};
export default config;


