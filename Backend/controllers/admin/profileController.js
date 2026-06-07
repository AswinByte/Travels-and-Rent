import User from "../../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

    user.address =
      req.body.address || user.address;

    await user.save();

    res.status(200).json({
      message:
        "Profile updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};