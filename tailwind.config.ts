import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        once92: {
          primary: '#004B87', // Azul del logo ONCE92
          secondary: '#0075C9', // Azul más claro
          accent: '#00A8E8', // Azul vibrante para la card
        }
      },
    },
  },
  plugins: [],
};
export default config;