import { Router } from "express";
import { getImage, uploadImage } from "../controller/image-upload";

const router = Router();

router.post("/", uploadImage);

router.get("/:id", getImage);

export default router;
