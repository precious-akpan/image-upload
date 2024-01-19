"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_upload_1 = require("../controller/image-upload");
const router = (0, express_1.Router)();
router.post('/', image_upload_1.uploadImage);
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ imageUrl: `/uploads/${id}` });
});
exports.default = router;
