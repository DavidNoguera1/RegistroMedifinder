/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0056b3',
        secondary: '#ffc107',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}