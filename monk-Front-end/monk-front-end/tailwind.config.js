module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      'serif': ["DM Serif Display"],
      'body': ['"Noto Serif"'],
      'normal': ['"Bree Serif"']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}
