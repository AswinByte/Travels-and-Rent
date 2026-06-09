import express from "express";
import upload
from "../../middleware/uploadMiddleware.js";

import {
  getSettings,
  updateSettings,
    uploadQrCode,

} from "../../controllers/admin/settingsController.js";

const router =
  express.Router();

router.get(
  "/",
  getSettings
);
router.post(
  "/upload-qr",
  upload.single("qrCode"),
  uploadQrCode
);
router.put(
  "/",
  updateSettings
);

export default router;