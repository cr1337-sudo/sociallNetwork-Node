const Image = require("../models/Image")
const sidebar = require("../helpers/sidebar")

const index = async (req, res) => {
   //Con lean se retorna un objeto js y es legible por handlebars, sin lean() se pueden mostrar los atributos del objeto en el template pero ano accede con this
   
   const images = await Image.find().sort({ timestamp: 1 /* 1 o -1 */ }).lean()
   let viewModel = { images }
   viewModel.images = images;
   viewModel = await sidebar(viewModel)
   res.render("index", viewModel)
}


module.exports = { index }