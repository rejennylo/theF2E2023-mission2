/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#D4009B',
        'primary-gray': '#334155',
        'secondary-gray': '#64748B',
        'role-blue': '#8082FF',
        'role-orange': '#F4A76F',
        'role-green': '#57D2A9',
      },
    },
  },
  plugins: [],
};
