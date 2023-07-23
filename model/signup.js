const mongoose = require("mongoose");
url = "mongodb://localhost:27017/tasks";

mongoose
  .connect(url)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });
signupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

dbs = mongoose.model("signup", signupSchema);
module.exports = dbs;
