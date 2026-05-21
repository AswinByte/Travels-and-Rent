import express from "express";

import {
  getUsers,
  getUserById,
  blockUser,
  unblockUser,
  deleteUser,
  updateUser
} from "../../controllers/admin/customerController.js";

import { protect }
from "../../middleware/authMiddleware.js";

import { admin }
from "../../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Protected
router.get(
  "/",
  protect,
  admin,
  getUsers
);

router.get(
  "/:id",
  protect,
  admin,
  getUserById
);

router.put(
  "/:id/block",
  protect,
  admin,
  blockUser
);

router.put(
  "/:id/unblock",
  protect,
  admin,
  unblockUser
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteUser
);
router.put(
  "/:id",
  protect,
  admin,
  updateUser
);
export default router;