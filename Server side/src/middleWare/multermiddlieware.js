// src/middleware/multerMiddleware.js
import multer from "multer";
import path from "path";
import express from "express"
 const app=express()
 app.use("/images",express.static("images"))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default upload;
