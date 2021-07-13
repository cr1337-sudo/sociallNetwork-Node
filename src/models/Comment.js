const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;
const Image = require("./Image")

const commentSchema = new Schema({
   image_id: {
      type: ObjectId,
      ref: "Image"
   },
   email: {
      type: String
   },
   name: {
      type: String
   },
   gravatar: {
      type: String
   },
   comment: {
      type: String
   },
   timestamp: {
      type: Date,
      default: Date.now
   },

})

module.exports = model("Comment", commentSchema)