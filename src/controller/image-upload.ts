import { RequestHandler } from "express";

import ImageModel from "../models/image";

/**
 * Uploads an image.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const uploadImage: RequestHandler = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get the filename and path of the uploaded file
    const { filename, path } = (req as { file: Express.Multer.File }).file;

    // Create a new ImageModel with the filename and path
    const image = new ImageModel({ filename, path });

    // Save the image to the database
    await image.save();

    // Return a success message
    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    // Throw the error for error handling middleware to handle
    throw error;
    // Alternatively, you can uncomment the line below to send a generic error message
    // res.status(500).json({ error: "Internal Server Error"});
  }
};
/**
 * Retrieves an image by its ID and returns its URL.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const getImage: RequestHandler = async (req, res) => {
  // Log the ID of the image being requested
  console.log("get_image", req.params.id);

  try {
    // Find the image with the specified ID
    const image = await ImageModel.findById(req.params.id);

    // If the image does not exist, return a 404 error
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Return the URL of the image
    res.json({ imageUrl: `/uploads/${image.filename}` });
  } catch (error) {
    // Return a 500 error if an internal server error occurs
    res.status(500).json({ message: "Internal Server Error", error });
  }
};