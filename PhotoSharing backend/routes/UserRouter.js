const express = require("express");
const userModel = require("../db/userModel");
const Photo = require("../db/photoModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
}

router.post("/login", async (req, res) => {

  const {username, password} = req.body;
  try {
    const user = await userModel.findOne({username});

    if(!username){
      return res.json({success: false, message: "User not found"});
    }


    if(password !== user.password){
      return res.json({success: false, message: "Wrong password"});
    }

    const token = createToken(user._id);
    res.json({success: true, token, user: user});
  }
  catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
});

router.post("/register", async (req, res) => {
  const {username, password, first_name, last_name, location, description, occupation} = req.body;
  try {
    const exist = await userModel.findOne({username});
    
    if(exist){
      return res.json({success: false, message: "User exists"});
    }

    const newUser = new userModel({
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      location: location,
      description: description,
      occupation: occupation
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({success: true, token, user: user});
  }
  catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
});

router.post("/profile", authMiddleware, async (req, res) => {
  const userId = req.body.userId; // Lấy userId từ req.body, được thêm bởi authMiddleware

  if (!userId) {
    return res.status(400).json({ success: false, message: "User not authenticated" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    res.json({ success: true, user: user});
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/list", async (request, response) => {
  try {
    const users = await userModel.find({});
    response.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userParam = req.params;
    const userId = userParam.id;
    const user = await userModel.findOne({_id: userId});
    res.json({success: true, data: user});
  }
  catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
})

module.exports = router;
