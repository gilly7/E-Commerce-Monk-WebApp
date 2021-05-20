module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      'serif': ["DM Serif Display"],
      'body': ['"Noto Serif"'],
      'normal': ['"Bree Serif"'],
      'poppins': ["Poppins"],
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      cursor: ['hover'],
      display: ['group-hover'],
      flex: ['group-hover'],
      visibility: ['group-hover'],
      justifyContent: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
