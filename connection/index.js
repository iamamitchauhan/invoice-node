const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://amitc:amit1769@test.ffbe2z8.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true })

const db = mongoose.connection;


db.on("connected", () => {
  console.info('DB is connected =>');
})

db.on("onerror", (err) => {
  console.info('DB is not connected =>', err);
})



