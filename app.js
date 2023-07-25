const express = require("express");
const cors = require('cors');
const app = express();
const session = require("express-session")
app.use(express.json());
app.use(cors())
app.use(session({
  secret: '16d100b158dc8a7def12b8cfe6d06f88d5ae0d792239ba9f992a2b6da82342a6cee9535aa7b4df8994e4a0cee7158373bea361238bad8cad36843cc540c194e9',
  resave:false,
  saveUninitialized:false,
}))
port = 8080;
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

