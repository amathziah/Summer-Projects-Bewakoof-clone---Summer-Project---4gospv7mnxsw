/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this according to your file structure
  ],
  theme: {
    extend: {
      minHeight: {
        '128': '32rem', // Ensure min-h-128 is defined
      },
    },
  },
  plugins: [],
}
