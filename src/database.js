const mongoose = require("mongoose");
const keys = require("./keys")

mongoose.connect(keys.database.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
   .then(db => console.log("Db is connected"))
   .catch(e => console.log(e))
