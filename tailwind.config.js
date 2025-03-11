import tailwindDottedBackground from 'tailwindcss-dotted-background';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        circular: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif','mono'],
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))"
      },
      backgroundImage: {
        dots: 'radial-gradient(circle, #2c2c2c 1px, transparent 1px)',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        border: 'border 5s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        border: {
          to: { '--border-angle': '360deg' },
        },
      },
    },
  },
  plugins: [tailwindDottedBackground],
};
