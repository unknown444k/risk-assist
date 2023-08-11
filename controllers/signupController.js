const signupModel = require("../model/signup");
const bcrypt = require("bcrypt");
const { authenticateToken } = require("./loginController");
const signupUser = async (req, res) => {
  try {
    const { name, email, phone, userpassword, confpassword } = req.body;

    if (!name || !email || !phone || !userpassword || !confpassword) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    if (userpassword !== confpassword) {
      res.status(400).json({ message: "password is mismatched" });
      return;
    }
    saltvalue = 10;

    const password = await bcrypt.hash(userpassword, saltvalue);
    const confirmpassword = await bcrypt.hash(confpassword, saltvalue);

    const newUser = await signupModel.create({
      name,
      email,
      phone,
      password,
      confirmpassword,
    });
    console.log(password);
    console.log(confirmpassword);

    res.status(200).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    if (error.name === "MongoError" && error.code === 11000) {
      res.status(404).json({ error: "email already exists" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      const users = await signupModel.find({ name: { $ne: "admin" } });
      if (!users) {
        res.status(200).json({ message: "user doesn't exists" });
      }
      res.status(200).json({ users });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getusersCount = async (req, res) => {
  try {
    const usersCount = await signupModel.countDocuments({
      name: { $nin: "admin" },
    });
    if (!usersCount) {
      res.status(200).json({ message: "usercount doesn't exists" });
    }
    res.status(200).json({ usersCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  getUsers,
  getusersCount,
};
