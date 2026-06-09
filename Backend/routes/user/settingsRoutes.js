import express from "express";
import AdminSettings from "../../models/AdminSettings.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const settings =
      await AdminSettings.findOne();

    res.status(200).json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

export default router;