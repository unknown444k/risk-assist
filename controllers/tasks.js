const taskmodel = require("../model/tasks");
const { authenticateToken } = require("./loginController");

async function getalltasks(req, res) {
  authenticateToken(req, res, async () => {
    const gettasks = await taskmodel.find({});
    res.status(200).json(gettasks);
  });
}
const createTasks = async (req, res) => {
  authenticateToken(req,res,async ()=>{
    try {
      const { name } = req.body;
      if (!name) {
        res.status(200).json({ error: "name should not empty" });
      }
      const task = await taskmodel.create({
        name
      });
      res.status(200).json({
        message: "tasks Created Successfully",
        data: task,
      });
  
    } catch (error) {
      console.log(error)
      if (error.name === "MongoError" && error.code === 11000) {
        res.status(404).json({ error: "tasks already exists" });
      }
      res.status(404).json({ error: "Internal server error" });
    }
  })
 
};

const updatetasks = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const { name } = req.body;
      const { id: taskID } = req.params;
      const task = await taskmodel.findOneAndUpdate(
        { _id: taskID },
        { name },
        {
          new: true,
          runValidatots: true,
        }
      );
      if (!task) {
        return res
          .status(404)
          .json({ message: `No task with the ID ${taskID}` });
      } else {
        res.status(200).json({ message:"task updated successfully",task });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deletetasks = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const { id: taskID } = req.params; // Extract the taskID from req.params.id

      const task = await taskmodel.findOneAndDelete({ _id: taskID });
      // Add await to wait for the findOne() operation and use lean() to return a plain object
      console.log(`the task list ${task}`);
      if (!task) {
        return res
          .status(404)
          .json({ message: `No task with the ID ${taskID}` });
      } else {
        res.status(200).json({ message:"task deleted successfully",task });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const getsingletasks = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const { id: taskID } = req.params; // Extract the taskID from req.params.id

      const task = await taskmodel.findOne({ _id: taskID }).lean();
      // Add await to wait for the findOne() operation and use lean() to return a plain object
      console.log(`the task list ${task}`);
      if (!task) {
        return res
          .status(404)
          .json({ message: `No task with the ID ${taskID}` });
      } else {
        res.status(200).json({ message:"view task",task });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getalltasks,
  createTasks,
  updatetasks,
  deletetasks,
  getsingletasks,
};
