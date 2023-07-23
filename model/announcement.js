const mongoose = require("mongoose");

async function dbconnect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (error) {
    console.log("not connected");
  }
}
dbconnect();

const announceShchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt :{
    type:Date,
    default:Date.now
  }
});

dbs = mongoose.model("announcement", announceShchema);
module.exports = dbs;
