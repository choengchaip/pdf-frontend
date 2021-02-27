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
      '25-p': '0 0 25%',
      '50-p': '0 0 50%',
      '100-p': '0 0 100%',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
