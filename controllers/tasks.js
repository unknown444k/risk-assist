const taskmodel = require("../model/tasks");
const userdata = require("../model/signup")
const { authenticateToken } = require("./loginController");

async function getalltasks(req, res) {
  authenticateToken(req, res, async () => {
    const gettasks = await taskmodel.find({});
    return res.status(200).json(gettasks);
  });
}
const createTasks = async (req, res) => {
  authenticateToken(req,res,async ()=>{
   
      const { description } = req.body;
      const {user} = req.body;
      if (!description || !user) {
        return res.status(200).json({ error: "description and user should not empty" });
      }
      try {
        const users = await userdata.findOne({name : user})
        if(!users){
          return res.status(200).json({ message: "User does not exists" });
        }
        else{
          const task = await taskmodel.create({
            description,
            user
          });
    
          return res.status(200).json({
            message: "tasks Created Successfully",
            data: task,
          });
        }
    } catch (error) {
      console.log(error)
      if (error.name === "MongoError" && error.code === 11000) {
        return res.status(404).json({ error: "tasks already exists" });
      }
      return res.status(404).json({ error: "Internal server error" });
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

        return res.status(200).json({ message:"task updated successfully",task });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const updatecompleted = async(req,res)=>{
  try {
    const {id:taskID} = req.params

    const complete = await taskmodel.findById({_id:taskID})
if(!complete){
return res.status(404).json({message: `No task with the ID ${taskID}` })
}else{
  complete.completed = !complete.completed
  await complete.save();
  return res.status(200).json({message :"status updated successfully",data : complete})

}

  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

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
  updatecompleted
};
