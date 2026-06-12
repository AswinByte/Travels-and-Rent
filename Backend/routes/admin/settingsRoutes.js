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
  (req, res, next) => {
    console.log("MIDDLEWARE START");
    next();
  },

  (req, res, next) => {
    upload.single("qrCode")(req, res, (err) => {
      if (err) {
        console.log("MULTER ERROR:");
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }

      console.log("UPLOAD SUCCESS");
      next();
    });
  },

  uploadQrCode
);

router.put(
  "/",
  updateSettings
);


export default router;