module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}"
  ],
  // to use dynamic classes with tailwind
  safelist: [
    {
      pattern: /text-/
    }
  ],
  plugins: [
    require('@tailwindcss/forms')
  ],
}