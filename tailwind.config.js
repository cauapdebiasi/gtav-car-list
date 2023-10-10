/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    extend: {
      screens: {
        'xmd': '900px',
        'xlmd': '1335px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'chess-pattern': 'url("/pattern.jpg")',
        'vehicle-card-header-gradient': 'linear-gradient(180deg, #E0DDDA 0%, #F4F2F0 45%, #EBE9E8 45%, #D0D2D1 100%)',
        'hero':'url("/hero.jpg")', 
        'legendary-title':'linear-gradient(180deg, #7D7C81 0%, #FFF 44.27%, #2C2840 60.65%, #B6BAC2 85%, #B6BAC2 100%)' 
      },
    },
  },
  plugins: [],
}
