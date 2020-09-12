module.exports = function (api) {
  const isProduction = api.env("production");
  return {
    presets: [
      [
        "next/babel",
        {
          "preset-env": isProduction
            ? {}
            : {
                targets: "last 1 chrome version",
              },
          "transform-runtime": isProduction
            ? {}
            : {
                useESModules: true,
              },
          // "styled-jsx": {
          //   plugins: ["styled-jsx-plugin-postcss"],
          //   sourceMaps: false,
          // },
        },
      ],
    ],
    plugins: ["inline-react-svg"],
  };
};
