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
      
    },
  },
  plugins: [
    require('tailwindcss-dotted-background')
  ],
};
