const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://dmamadaminov7:cloud.mongodb@music.ujx1nbl.mongodb.net/?retryWrites=true&w=majority"
  )

  mongoose.connection.on("open", () => {
    console.log("mongodb ulandi")
  })

  mongoose.connection.on("error", (err) => {
    console.log("mongodb ulanishdagi xatolik:", err)
  })

  mongoose.connection.on("close", () => {
    console.log("mongodb uzildi")
  })
}
mongoose.Promise = global.Promise
