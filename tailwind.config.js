module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
    flex: {
      '50-p': '0 0 50%',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
