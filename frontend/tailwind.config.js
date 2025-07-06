/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'bg-gradient-to-r',
    'from-red-500', 'to-pink-500',
    'from-yellow-500', 'to-amber-500',
    'from-gray-700', 'to-gray-600',
    'from-cyan-500', 'to-blue-500',
    'from-amber-500', 'to-orange-500',
    'text-white', 'text-gray-200',
    'border-red-400', 'border-yellow-400', 'border-gray-500', 'border-cyan-400', 'border-amber-400',
    'hover:from-cyan-500', 'hover:to-blue-500', 'hover:text-white', 'hover:border-cyan-400',
    'hover:shadow-lg', 'hover:shadow-cyan-500/30', 'hover:scale-105',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

