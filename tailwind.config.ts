import type { Config } from 'tailwindcss'
import tailwindcssAnimatePlugin from 'tailwindcss-animate'
import tailwindcssReactAriaComponentsPlugin from 'tailwindcss-react-aria-components'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimatePlugin, tailwindcssReactAriaComponentsPlugin],
} satisfies Config
