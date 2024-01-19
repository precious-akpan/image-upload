import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// Joi schema for validation
const imageUploadSchema = Joi.object({
  file: Joi.any()
    .required()
    .custom((value, helpers) => {
      if (!value.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return helpers.error("Invalid file type");
      }
      return value;
    }),
});

/**
 * Validate the uploaded image.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call.
 */
export const validateImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the uploaded image using the imageUploadSchema
    await imageUploadSchema.validateAsync(req.file);

    // Call the next function
    next();
  } catch (error) {
    // If the error is an object, send a 400 response with the error message
    if (typeof error === "object" && error !== null) {
      res.status(400).json({ error });
    }
  }
};