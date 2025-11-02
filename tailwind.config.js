/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Add our new brand colors
      colors: {
        'brand-green': '#10B981', // Emerald 500
        'brand-green-light': '#A7F3D0', // Emerald 200
        'brand-green-dark': '#047857',  // Emerald 700
      },
      // 2. Add all the new keyframe animations
      keyframes: {
        // Animation for the gradient background
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Animation for the floating shapes
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        // Animation for the button glow
        'glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px 0px rgba(16, 185, 129, 0.5)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 20px 10px rgba(16, 185, 129, 0.5)',
            transform: 'scale(1.02)'
          },
        },
      },
      // 3. Register the animations
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

