/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        '128': '32rem', // Ensure min-h-128 is defined
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-sky-500',
    'hover:bg-sky-700',
    // Add more classes here if needed
  ],
};

