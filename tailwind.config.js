module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}"
  ],
  // to use dynamic classes with tailwind, bug with Nuxt3
  safelist: [
    'bg-red-50',
    'bg-green-50',
    'text-red-400',
    'text-green-400',
    'text-red-800',
    'text-green-800',
    'bg-red-50',
    'bg-green-50',
    'text-red-500',
    'text-green-500',
    'bg-red-100',
    'bg-green-100',
    'ring-offset-red-50',
    'ring-offset-green-50',
    'ring-red-600',
    'ring-green-600',
  ],
  plugins: [
    require('@tailwindcss/forms')
  ],
}