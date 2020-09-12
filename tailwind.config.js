module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {},
  plugins: [],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#EB4A27",
        },
        purple: {
          1000: "#2A0A4A",
        },
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        default: theme("colors.gray.400"),
      }),
      boxShadow: {
        "2xl-darker": "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
      },
    },
  },
};
