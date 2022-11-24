/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        280: "280px"
      },
      height: {
        280: "280px"
      },
      padding: {
        200: "200px",
      },
      colors: {
        primary: 'rgba(200, 90, 39, 0.57)',
        secondary: "#C85A27",
        divider: "#ABABAB",
        'header': '#D9D9D9',
        'placeholder': 'rgba(0, 0, 0, 0.25)',
        'black35': 'rgba(0, 0, 0, 0.35)',
        'account-divider': 'rgba(0, 0, 0, 0.40)',
        'nav-item': 'rgba(0, 0, 0, 0.42)',
        'menu-nav': 'rgba(0, 0, 0, 0.46)',
        'account-nav': 'rgba(0, 0, 0, 0.47)',
        'black70': 'rgba(0,0,0,0.7)',
        'kaliablue' : "#223263",
        'kaliayellow' : "#F9AF5E"
      },
      fontSize: {
        '13': ['13px', '13px'],
        '15': '15px',
        '20': '20px',
        '25': '25px',
        '28': '28px',
        '30': '30px',
        '32': ['32px', '36px'],
        '34': "34px",
        '40': "40px"
      },
      boxShadow: {
        'circle': '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },
      fontFamily:{
        'kopub-batang': ['KoPub Batang'],
        'inconsolata': ['Inconsolata'],
        'inter': ['Inter'],
        'poppins' : ['Poppins']
      },
      borderWidth:{
        '1': '1px',
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover']
    }
  }
}