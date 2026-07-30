// Tailwind runs through PostCSS rather than the Vite plugin: @tailwindcss/vite
// is not compatible with the rolldown-based Vite that Astro 7 bundles, and
// fails the production build with "createIdResolver is not a function".
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
