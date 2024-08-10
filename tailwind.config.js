/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        'header':"10vh",
        "main":"80vh",
        "postcard":"30vh",
        "postcardPC":"47vh",
        
      },

      width:{
        'input':"70vw",
      },

      fontSize:{
        "sm":"3vmin",
        "md":"5vmin"

      }
      
      
    },
  },
  plugins: [],
}

