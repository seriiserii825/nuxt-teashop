/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: [
      // all directories and extensions will correspond to your Nuxt config
      'srcDir/components/**/*.{vue,js,jsx,mjs,ts,tsx}',
      'srcDir/layouts/**/*.{vue,js,jsx,mjs,ts,tsx}',
      'srcDir/pages/**/*.{vue,js,jsx,mjs,ts,tsx}',
      'srcDir/plugins/**/*.{js,ts,mjs}',
      'srcDir/composables/**/*.{js,ts,mjs}',
      'srcDir/utils/**/*.{js,ts,mjs}',
      'srcDir/{A,a}pp.{vue,js,jsx,mjs,ts,tsx}',
      'srcDir/{E,e}rror.{vue,js,jsx,mjs,ts,tsx}',
      'srcDir/app.config.{js,ts,mjs}',
      'srcDir/app/spa-loading-template.html',
    ],
  },
  theme: {
    screens: {
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
    },
    container: {
      padding: '20px',
      center: true,
    },
    extend: {
      colors: {
        accent: {
          light: 'rgb(var(--accent-color-light) / <alpha-value>)', //use in html class "text-accent-light"
          DEFAULT: 'rgb(var(--accent-color) / <alpha-value>)', //use in html class "text-primary"
          dark: 'rgb(var(--accent-color-dark) / <alpha-value>)', //use in html class "text-accent-dark"
        },
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'], // use in html class "font-sans"
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), 'prettier-plugin-tailwindcss'],
}
