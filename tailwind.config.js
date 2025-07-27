/** @type {import('tailwindcss').Config} */

//  Get our colors and shadows from the theme
const colors = require('./src/styles/tailwind-colours.js');
const colorsList = Object.keys(colors.colors);


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  safelist: [
    // Ensure all colors are available in Tailwind
    ...colorsList.map(color => `bg-${color}`),
    ...colorsList.map(color => `text-${color}`),
    ...colorsList.map(color => `border-${color}`),
  ],
  theme: {
    extend: {
      colors: colors.colors,
      boxShadow: {
        // default neon glows
        'glow-maize': '0 0 8px #FFED65aa, 0 0 16px #FFED6555',
        'glow-aero': '0 0 8px #41BBD9aa, 0 0 16px #41BBD955',
        'glow-slate-blue': '0 0 8px #7D53DEaa, 0 0 16px #7D53DE55',
        // subtle glows (smaller blur + darker shade)
        'glow-maize-subtle': '0 0 4px #E6D23Eaa, 0 0 8px #E6D23E55',
        'glow-aero-subtle': '0 0 4px #359FB7aa, 0 0 8px #359FB755',
        'glow-slate-blue-subtle': '0 0 4px #693BC2aa, 0 0 8px #693BC255',
        // highlight glows (larger blur + lighter shade)
        'glow-maize-highlight': '0 0 12px #FFF289aa, 0 0 24px #FFF28955',
        'glow-aero-highlight': '0 0 12px #6CD5EAaa, 0 0 24px #6CD5EA55',
        'glow-slate-blue-highlight': '0 0 12px #9678E4aa, 0 0 24px #9678E455',
        // glass shadows
        'glow-glass-light': '0 0 8px rgba(255,255,255,0.1) 0 0 16px rgba(255,255,255,0.1)',
        'glow-glass-dark': '0 0 8px rgba(0,0,0,0.3) 0 0 16px rgba(0,0,0,0.3)',
      },
      outline: {
        // default outline styles
        'davy-gray': ['2px solid #50514F', '2px'],
        'maize': ['2px solid #FFED65', '2px'],
        'aero': ['2px solid #41BBD9', '2px'],
        'slate-blue': ['2px solid #7D53DE', '2px'],
        'ghost-white': ['2px solid #FAFAFF', '2px'],
      },
      backgroundColor: {
        // glass layers and dark fallback
        'glass-light': 'rgba(255,255,255,0.1)',
        'glass-dark': 'rgba(0,0,0,0.3)',
        'dark': '#010308',
      },
      backdropBlur: {
        xs: '2px',
        sm: '5px',
        md: '10px',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const colors = theme('colors')
      const shadows = theme('boxShadow')

      // 1) Outline utilities
      const outlineUtils = {}
      for (const name of ['davy-gray', 'maize', 'aero', 'slate-blue', 'ghost-white']) {
        outlineUtils[`.outline-${name}-subtle`] = { outline: `2px solid ${colors[name].subtle}` }
        outlineUtils[`.outline-${name}-highlight`] = { outline: `2px solid ${colors[name].highlight}` }
      }
      addUtilities(outlineUtils)

      // 2) Inset-glow utilities for every glow-* shadow
      const insetUtils = {}
      Object.entries(shadows).forEach(([key, val]) => {
        if (key.startsWith('glow-')) {
          const insetValue = val
            .split(',')
            .map(layer => `inset ${layer.trim()}`)
            .join(', ')
          insetUtils[`.shadow-${key}-inset`] = { 'box-shadow': insetValue }
        }
      })
      addUtilities(insetUtils, { variants: ['responsive', 'hover', 'focus'] })
    }
  ],
}
