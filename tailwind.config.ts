import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#072B5B',
        teal: '#0797A5',
        surface: '#F6F9FC',
        border: '#DFE7EF',
        muted: '#526173',
      },
      boxShadow: {
        card: '0 10px 30px rgba(7, 43, 91, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
