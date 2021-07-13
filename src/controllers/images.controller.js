const path = require("path")
const fs = require("fs-extra")
const md5 = require("md5")
const Image = require("../models/Image")
const Comment = require("../models/Comment")
const sidebar = require("../helpers/sidebar")


const index = async (req, res) => {
   let viewModel = { image: {}, comments: {} };
   const image = await Image.findOne({ filename: req.params.imageId }).lean()
   if (image) {
      await Image.findOneAndUpdate({ filename: req.params.imageId }, { views: image.views + 1 }, { new: true, useFindAndModify: false })
      viewModel.image = image
      const comments = await Comment.find({ image_id: image._id }).lean()
      viewModel.comments = comments
      viewModel = await sidebar(viewModel)
      res.render("image", viewModel)

   } else {
      res.redirect("/")
   }
};

const create = async (req, res) => {
   // req.file is the `avatar` file
   // req.body will hold the text fields, if there were any
   try {

      const { file } = req;
      const ext = path.extname(file.originalname).toLowerCase()//Extrae la extension del nombre
      const imagePath = file.path;
      const imageTargetPath = path.resolve(`src/public/upload/${file.filename}${ext}`)

      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
         await fs.rename(imagePath, imageTargetPath)
         const newImg = new Image({
            title: req.body.title,
            filename: file.filename + ext,
            description: req.body.description
         })

         const imageSaved = await newImg.save()
         res.redirect(`/images/${imageSaved.filename}`)

      } else {
         await fs.unlink(imagePath)
         res.satus(500).json({ error: "Only images are allowed" })
      }
   }catch{
      res.redirect("/")
   }
};

const like = async (req, res) => {
   const image = await Image.findOne({ filename: req.params.imageId }).lean()
   if (image) {
      await Image.findOneAndUpdate({ filename: req.params.imageId }, { likes: image.likes + 1 }, { new: true, useFindAndModify: false })
      res.json({ likes: image.likes })
   } else {
      res.redirect("/")
   }
};

const comment = async (req, res) => {
   const image = await Image.findOne({ filename: req.params.imageId })
   if (image) {
      const newComment = new Comment(req.body)
      newComment.gravatar = md5(newComment.email)
      newComment.image_id = image._id

      await newComment.save()
      res.redirect(`/images/${image.filename}`)
   } else {
      res.redirect("/")
   }
};

const remove = async (req, res) => {
   const image = await Image.findOne({
      filename: req.params.imageId,
   });
   if (image) {
      await fs.unlink(path.resolve("./src/public/upload/" + image.filename));
      await Comment.deleteMany({ image_id: image._id })
      await image.remove();
      res.redirect("/")


   } else {
      res.json({ response: "Bad Request." });
   }
}
module.exports = { index, create, like, comment, remove }