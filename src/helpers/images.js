const Image = require("../models/Image")

module.exports = {

   async popular() {
      try {
         const images = await Image.find().limit(9).sort({ likes: -1 }).lean();
         if (images) return images
      } catch {
         return [0]
      }
   },
}