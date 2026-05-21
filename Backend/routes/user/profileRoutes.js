import express from "express";

import {
  getUserProfile,
  updateUserProfile,
  changePassword
} from "../../controllers/user/profileController.js";

import { protect }
from "../../middleware/authMiddleware.js";

import upload
from "../../middleware/uploadMiddleware.js";

const router = express.Router();

// Protected User Routes
router.get(
  "/",
  protect,
  getUserProfile
);

router.put(
  "/",
  protect,
  upload.single("profileImage"),
  updateUserProfile
);
router.put(
  "/change-password",
  protect,
  changePassword
);
export default router;