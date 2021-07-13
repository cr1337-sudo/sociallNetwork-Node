const express = require('express')
const app = express()
const path = require("path")
const exphbs = require("express-handlebars")
const morgan = require("morgan")
const multer = require("multer")
const indexRoutes = require("./routes/index")
const errorHandler = require('errorhandler')

require("./database")

//Settings
app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"))
app.engine(".hbs", exphbs({
   defaultLayout: "main",
   partialsDir: path.join(app.get("views"), "partials"),
   layoutsDir: path.join(app.get("views"), "layouts"),
   helpers: require("./server/helpers"),
   extname: ".hbs",
}))
app.set("view engine", ".hbs")

//middlewares
app.use(morgan("dev"))
app.use(multer({
   dest: path.join(__dirname, "./public/upload/temp")
}).single("image"))//Single("image") hace referencia al nombre del formulario por el cual se manda la imagen (name="image")
app.use(express.urlencoded({ extended: false })) //Así se reciben los datos que vienen de los formularios
app.use(express.json());

//Routes
app.use("", indexRoutes)

//Static Files
app.use("/public", express.static(path.join(__dirname, "./public")))


//Error handlers
if ("development" == app.get("env")) {
   app.use(errorHandler)
}

app.listen(app.get("port"), () => {
   console.log(`Server on port ${app.get("port")}`)
});
