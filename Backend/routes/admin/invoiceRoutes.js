import express from "express";

import {
  generateInvoice,
  getInvoices,
  downloadInvoice
} from "../../controllers/admin/invoiceController.js";

import { protect }
from "../../middleware/authMiddleware.js";

import { admin }
from "../../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Protected
router.post(
  "/:bookingId",
  protect,
  admin,
  generateInvoice
);

router.get(
  "/",
  protect,
  admin,
  getInvoices
);
router.get(
  "/download/:id",
  protect,
  admin,
  downloadInvoice
);
export default router;