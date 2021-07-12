const path = require("path")
const fs = require("fs-extra")
const Image = require("../models/Image")


const index = (req, res) => {
   res.send("Image index page")
};

const create = async (req, res) => {
   // req.file is the `avatar` file
   // req.body will hold the text fields, if there were any
   const { file } = req;
   const ext = path.extname(file.originalname).toLowerCase()//Extrae la extension del nombre
   const imagePath = file.path;
   const imageTargetPath = path.resolve(`src/public/upload/${file.filename}.${ext}`)

   if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
      await fs.rename(imagePath, imageTargetPath)
      const newImg= new Image({
         title: req.body.title,
         filename: file.filename,
         description: req.body.description
      })

      const imageSaved = await newImg.save()
   }else{
      await fs.unlink(imagePath)
      res.satus(500).json({error:"Only images are allowed"})
   }
   res.redirect("/")
};

const like = (req, res) => {
   res.send("Like an image")
};

const comment = (req, res) => {
   res.send("Comment post")
};

const remove = (req, res) => {
   res.send("remove image")
}
module.exports = { index, create, like, comment, remove }