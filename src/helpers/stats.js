const Image = require("../models/Image")
const Comment = require("../models/Comment")

const imagesCounter = async () => {
   return await Image.countDocuments()

}

const commentsCounter = async () => {
   return await Comment.countDocuments() 
}

const imagesTotalViews = async () => {
   //Recorre todas las imagenes, de cada imagen toma el valor de views y lo acumula en viewsTotal
   try {

      const result = await Image.aggregate([{
         $group: {
            _id: "1",
            viewsTotal: { $sum: "$views" }
         }
      }])
      //Result devuelve un array con un obj dentro, por eso se accede al elemento 0 y a sus viewsTotal
      return result[0].viewsTotal
   } catch {
      return [0]
   }
}

const imagesTotalLikes = async () => {
   try{

      const result = await Image.aggregate([{
         $group: {
            _id: "1",
            likesTotal: { $sum: "$likes" }
         }
      }])
      //Result devuelve un array con un obj dentro, por eso se accede al elemento 0 y a sus viewsTotal
      return result[0].likesTotal
   }catch{
      return [0]
   }

}
module.exports = async () => {

   //Promise.all() para trabajar todas las promesas a la vez, para no perder tanto tiempo
   const results = await Promise.all([
      imagesCounter(),
      commentsCounter(),
      imagesTotalViews(),
      imagesTotalLikes()
   ])
   return {
      images: results[0],
      comments: results[1],
      views: results[2],
      likes: results[3]
   }
}
//Esto retorna un arreglo con todos los valores que se mandaron en la promesa