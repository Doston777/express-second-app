const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

// Routes
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const musicsRouter = require("./routes/musics")
const authorsRouter = require("./routes/authors")

const app = express()

// Mongodb connect
const db = require("./helpers/mongodb")()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

// middlewares
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Register routes
app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/api/musics", musicsRouter)
app.use("/api/authors", authorsRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
