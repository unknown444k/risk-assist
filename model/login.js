const mongoose = require("mongoose");

url = "mongodb://localhost:27017/tasks";

connectdb = mongoose.connect(url);

if (!connectdb) {
  console.log("not Connected to database");
} else {
  console.log("Connected to database");
}

loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastlogin: {
    type: Date,
  },
});

dbs = mongoose.model("loginUsers", loginSchema);
module.exports = dbs;
