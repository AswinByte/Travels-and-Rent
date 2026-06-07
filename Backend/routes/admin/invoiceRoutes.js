import express from "express";

import {
 generateInvoice,
  getInvoices,
  getInvoiceById,
  deleteInvoice,
  downloadInvoice,
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

router.get(
  "/:id",
  protect,
  admin,
  getInvoiceById
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteInvoice
);
export default router;