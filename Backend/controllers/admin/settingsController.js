import AdminSettings from "../../models/AdminSettings.js";

// Get Settings
export const getSettings = async (
  req,
  res
) => {
  try {
    let settings =
      await AdminSettings.findOne();

    if (!settings) {
      settings =
        await AdminSettings.create(
          {}
        );
    }

    res.status(200).json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Settings
export const updateSettings =
  async (req, res) => {

    try {

      let settings =
        await AdminSettings.findOne();

      if (!settings) {

        settings =
          await AdminSettings.create(
            req.body
          );

      } else {

        Object.assign(
          settings,
          req.body
        );

        await settings.save();
      }

      res.status(200).json(
        settings
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

export const uploadQrCode = async (req, res) => {
  try {

    console.log("===== QR UPLOAD START =====");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let settings = await AdminSettings.findOne();

    if (!settings) {
      settings = await AdminSettings.create({});
    }

    if (!req.file) {
      return res.status(400).json({
        message: "QR image required",
      });
    }

    settings.qrCode =
  req.file.path;

console.log("Saving:");
console.log(settings);

await settings.save();

console.log("Saved Successfully");

    res.status(200).json({
      message: "QR uploaded successfully",
      settings,
    });

  } catch (error) {

    console.log("===== QR UPLOAD ERROR =====");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};