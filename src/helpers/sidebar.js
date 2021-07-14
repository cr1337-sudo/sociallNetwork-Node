const Stats = require("./stats")
const Images = require("./images")


module.exports = async (viewModel) => {
   const results = await Promise.all([
      Stats(),
      Images.popular(),
   ]);

   viewModel.sidebar = {
      stats: results[0],
      popular: results[1],
   };

   return viewModel;
};