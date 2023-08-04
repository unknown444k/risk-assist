const mongoose = require("mongoose");
url = "mongodb://localhost:27017/tasks";

const connectdb = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};

connectdb();

taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

dbs = mongoose.model("tasksDetails", taskSchema);
module.exports = dbs;
