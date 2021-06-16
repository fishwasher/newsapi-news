const webpack = require("webpack");
const config = require("./webpack.config.js");

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  console.log(
    stats.toString({
      chunks: true,
      colors: true,
    })
  );
});
