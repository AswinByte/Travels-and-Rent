import User from "../../models/User.js";

// Get All Users
export const getUsers = async (
  req,
  res
) => {
  try {

    const users = await User.find()
      .select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single User
export const getUserById = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Block User
export const blockUser = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.status = "blocked";

    await user.save();

    res.status(200).json({
      message: "User blocked",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Unblock User
export const unblockUser = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.status = "active";

    await user.save();

    res.status(200).json({
      message: "User unblocked",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
export const deleteUser = async (
  req,
  res
) => {
  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "User deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.params.id
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

    // Admin can change role
    user.role =
      req.body.role || user.role;

    // Admin can change status
    user.status =
      req.body.status || user.status;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};