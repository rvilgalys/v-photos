const optimizedImages = require("next-optimized-images");

module.exports = optimizedImages({
  responsive: { adapter: require("responsive-loader/sharp") },
});
