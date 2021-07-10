const { Schema,model } = require("mongoose");

const imageSchema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	filename: {
		type: String
	},
	views: {
		type: Number,
		default: 0
	},
	likes: {
		type: Number,
		default: 0
	},
	timestamp: {
		type: Date,
		default: Date.now()
	}
})

module.exports = model("Image",imageSchema)