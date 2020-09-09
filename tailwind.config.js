module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./src/components/**/*.tsx", 
    "./src/components/**/*.js", 
    "./src/pages/**/*.tsx",
    "./src/pages/**/*.js"
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
