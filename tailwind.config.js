/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js,jsx,tsx}"],
 
  theme: {
    extend: {
      flex:{
        '3':'3 3 0%'
      },
      borderColor:{
        "gold":"gold"
      }
    },
  },
  plugins: [],
}

