/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
            primaryBlue: "#0e3087",
            darkBlue: "#14285F"
        },
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
