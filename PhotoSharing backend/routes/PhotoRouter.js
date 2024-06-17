const express = require("express");
const Photo = require("../db/photoModel");
const userModel = require("../db/userModel");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`)
  }
});

// Khởi tạo multer với cấu hình lưu trữ
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), authMiddleware, async (req, res) => {
  const userId = req.body.userId; // Lấy userId từ req.body, được thêm bởi authMiddleware

  if (!userId) {
    return res.status(400).json({ success: false, message: "User not authenticated" });
  }

  // Kiểm tra xem đã tải lên ảnh thành công chưa
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image uploaded" });
  }

  try {
    // Tạo một đối tượng Photo mới
    const newPhoto = new Photo({
      file_name: req.file.filename,
      date_time: Date.now(),
      user_id: userId,
      // Khởi tạo một mảng rỗng để lưu trữ các bình luận
      comments: []
    });

    // Lưu đối tượng Photo mới vào cơ sở dữ liệu
    await newPhoto.save();

    res.status(201).json({ success: true, message: "Photo added successfully", photo: newPhoto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding photo" });
  }
});


router.post("/commentsOfPhoto/:photo_id", authMiddleware, async (req, res) => {
  const {photo_id} = req.params;
  const {comment} = req.body;

  if(!comment || comment.trim() === ""){
    return res.status(400).json({success: false, message: "Ko de comment trong"});
  }

  try {
    const photo = await Photo.findById(photo_id);
    if(!photo){
      return res.status(404).json({success: false, message: "Anh khong ton tai"});
    }
    const newComment = {
      user_id: req.body.userId,
      comment: comment.trim(),
      date_time: new Date(),
    }

    photo.comments.push(newComment);
    await photo.save();
    res.json({success: true, message: "Success"});
  } catch (error) {
    res.status(500).json({success: true, message: "Error"});
  }
});

router.get("/:id", async (request, response) => {
  try {
    const userParam = request.params;
    const userId = userParam.id;
    const photos = await Photo.find({user_id: userId});
    response.json({ success: true, data: photos});
  }
  catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
});

module.exports = router;
