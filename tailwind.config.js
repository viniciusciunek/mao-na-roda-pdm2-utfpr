/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        fontFamily: {
            'poppins_black': ['Poppins_900Black'],
            'nunito_black': ['Nunito_900Black'],
            'nunito_regular': ['Nunito_400Regular'],
            'nunito_xligth': ['Nunito_200ExtraLight'],
            'poppins_bold': ['Poppins_700Bold']
         }
      },
    },
    plugins: [],
  }
