const signupdb = require("../model/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const announcedb = require("../model/announcement")
const tasks = require("../model/tasks")
require("dotenv").config();

const loginUser = async (req, res) => {
  try {
    const { useremail, userpassword } = req.body;
    const user = await signupdb.findOne({ email: useremail });
    const isPasswordMatch = await bcrypt.compare(
      userpassword,
      user.confirmpassword
    );
    if (user.email == "admin@gmail.com" && isPasswordMatch == true) {
       const getannounce = await announcedb.find({});
       const count = await signupdb.countDocuments({ name: { $nin: "admin" } });
       const users = await signupdb.find({ name: { $nin: "admin" } });
       res.status(200).json({ userCount: count,userList: users,queryList: getannounce });
    } else {
      if (!user) {
        return res.status(422).json({ message: "Invalid credentials" });
      }
      if (!isPasswordMatch) {
        return res.status(422).json({ message: "Invalid password" });
      }

      const payload = {
        userId: user._id,
        userEmail: user.email,
        userName: user.name,
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      console.log(user.name)
      const task = await tasks.find({ user: user.name });
      const taskcount = await tasks.countDocuments({user: user.name})
       res
        .status(200)
        .json({ message: "Login Successful", accessToken: token , data:task,taskcount:taskcount})

      }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminLogin = async (req, res) => {
  const { adminemail, adminpassword } = req.body;
  if (!adminemail || !adminpassword) {
    return res
      .status(400)
      .json({ message: "Username and password should not be empty" });
  }

  try {
    if (adminemail !== "admin@gmail.com" || adminpassword !== "admin@123") {
      return res.status(401).json({ message: "Invalid user access" });
    }

    const adminUser = await signupdb.findOne({ email: adminemail });

    const isPasswordMatch = await bcrypt.compare(
      adminpassword,
      adminUser.confirmpassword
    );
    if (!isPasswordMatch) {
      return res.status(422).json({ message: "Invalid password" });
    }

    const users = await signupdb.find({ name: { $nin: "admin" } });
    return res.status(200).json({ userList: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

function authenticateToken(req, res, next) {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

const logoutUser = async(req,res)=>{
  try {
    await req.session.destroy((err)=>{
      if(err){
        return res.status(404).json({error:"Error occured during logged out"})
      }
      return res.status(200).json({ message: 'Logout successful.' });
    })
  } catch (error) {
    return res.status(500).json({error:"Internal server error"})
  }
}


module.exports = {
  loginUser,
  adminLogin,
  authenticateToken,
  logoutUser
};
