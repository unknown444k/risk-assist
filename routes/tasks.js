const express = require("express");
const router = express.Router();
const task = require("../controllers/tasks")
const login = require("../controllers/loginController");
const signup = require("../controllers/signupController");
const announcement = require("../controllers/announceController");

router.route("/").get(task.getalltasks).post(task.createTasks);
router.route("/:id").get(task.getsingletasks).patch(task.updatetasks).delete(task.deletetasks)
router.route("/login").post(login.loginUser);
router.route("/logout").post(login.logoutUser);
router.route("/status/:id").patch(task.updatecompleted)

router.route("/adminlogin").post(login.adminLogin);
router.route("/signup").post(signup.signupUser);
router.route("/userdetails/users").get(signup.getUsers);
router.route("/userdetails/userscount").get(signup.getusersCount);

router
  .route("/announcement/announce")
  .post(announcement.createAnnounce)
  .get(announcement.getAnnounment);

router
  .route("/announcement/announce/:id")
  .delete(announcement.deleteAnnounce)
  .patch(announcement.updateAnnounce)
  .get(announcement.getspecificannounce);
router.route("/announcement/status/:id").patch(announcement.updateStatus)

module.exports = router;
