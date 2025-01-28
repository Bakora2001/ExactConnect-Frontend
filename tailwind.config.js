// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        circular: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        dots: "radial-gradient(circle, #2c2c2c 1px, transparent 1px)",
      },
      animation:{
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      }
    },
  plugins: [
    require('tailwindcss-dotted-background')
  ],
};
