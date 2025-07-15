/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'davy-gray': '#50514F',      // Neutral dark base
        'maize': '#FFED65',          // High-impact highlight
        'aero': '#41BBD9',           // Primary neon accent (cyan)
        'slate-blue': '#7D53DE',     // Secondary neon accent (purple)
        'ghost-white': '#FAFAFF',    // Light text / glass panels
      },
      boxShadow: {
        'glow-aero': '0 0 8px rgba(65,187,217,0.6), 0 0 16px rgba(65,187,217,0.4)',
        'glow-slate-blue': '0 0 8px rgba(125,83,222,0.6), 0 0 16px rgba(125,83,222,0.4)',
        'glow-maize': '0 0 8px rgba(255,237,101,0.6), 0 0 16px rgba(255,237,101,0.4)',
        'glow-maize-subtle': '0 0 4px rgba(255,237,101,0.6), 0 0 8px rgba(255,237,101,0.4)',
        'glass-light': '0 2px 10px rgba(255,255,255,0.1)',
      },
      outline: {
        'aero': ['2px solid #41BBD9', '2px'],
        'slate-blue': ['2px solid #7D53DE', '2px'],
        'maize': ['2px solid #FFED65', '2px'],
      },
      backgroundColor: {
        'glass-light': 'rgba(255,255,255,0.1)',
        'glass-dark': 'rgba(0,0,0,0.3)',
        'dark': '#010308'
      },
      backdropBlur: {
        xs: '2px',
        sm: '5px',
        md: '10px',
      },
    },
  },
  plugins: [],
};

