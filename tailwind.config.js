/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // DESIGN.md palette
        'outer-bg': '#E9EDF3',
        'surface': '#F7F8FA',
        'text-primary': '#171717',
        'text-secondary': '#777D86',
        'text-muted': '#A0A5AD',
        'border-subtle': '#EDEFF2',

        // PRD thematic colors
        espresso: '#1A0F0D',
        roast: '#3D231D',
        cream: '#FDFBF7',
        latte: '#E8DCC4',
        'amber-accent': '#D97706',

        // Accent
        accent: '#2F80ED',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        lg: '14px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgb(16 25 45 / 0.06), 0 1px 2px -1px rgb(16 25 45 / 0.06)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
