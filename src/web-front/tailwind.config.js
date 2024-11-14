import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-primary': '#1e1e2e',
        'light-primary': '#f4f7fe',
        'dark-sidebar': '#18181b',
        'light-sidebar': '#fff',
        'second-dark': '#3d3d40',
        'second-light': '#f4f4f5',
      },
      colors: {
          primary: '#1b4208',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}