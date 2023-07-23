const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
port = 5500;
const tasks = require("../starter/routes/tasks");

app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});


//app.get("/api/v1/tasks") = get all the tasks
//app.post("/api/v1/tasks") = create the tasks
//app.get("/api/v1/tasks/:id") = get specific tasks
//app.patch("/api/v1/tasks/:id") = update tasks
//app.delete("/api/v1/tasks/:id") = delete tasks

