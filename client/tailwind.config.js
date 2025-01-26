/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'slate-800': 'rgb(30 41 59)',
        'slate-900': 'rgb(15 23 42)',
        'hollow-black': '#000000',
        'hollow-gray': '#151515',
        'hollow-dirt': '#292929',
        'hollow-white': ' #fafbf6',
        'hollow-orange': '#fb7e14',
      }
    }
  },
  variants: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: []
});
