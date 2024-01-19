import express, { NextFunction, Request, Response } from "express";
import mongoose, { Error } from "mongoose";
import { json } from "body-parser";
import multer from "multer";
import imageRoutes from "./routes/image-upload";
import morgan from "morgan";
import { validateImage } from "./middleware/validation";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(json());


// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Endpoint for image upload
app.use("/upload" , upload.single("file"), validateImage, imageRoutes);

// Endpoint for getting images
app.use("/get_image", imageRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/imageUploader")
  .then((r) => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
