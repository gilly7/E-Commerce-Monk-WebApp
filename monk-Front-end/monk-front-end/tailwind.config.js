module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      serif: ["DM Serif Display"],
      body: ['"Noto Serif"'],
      normal: ['"Bree Serif"'],
      poppins: ["Poppins"],
    },
    colors: {
      blue: {
        secondary: "#B9F1DA",
        primary: "#012C50",
      },
      white: {
        primary: "#fff",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      secondary: "#B9F1DA",
      primary: "#012C50",
    }),
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
      cursor: ["hover"],
      display: ["group-hover"],
      flex: ["group-hover"],
      visibility: ["group-hover"],
      justifyContent: ["group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
