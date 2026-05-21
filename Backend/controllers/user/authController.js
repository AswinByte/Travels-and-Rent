import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../../config/nodemailer.js";
import {
  generateOTP,
  hashPassword,
  comparePassword
} from "../../utils/helpers.js";
import { logger }
from "../../utils/logger.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Success response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};  

export const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

//forgotPassword
export const forgotPassword = async (
  req,
  res
) => {
  try {

    const { email } = req.body;

    // Check User
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate 4 Digit OTP
    const otp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    // Save OTP
    user.otp = otp;

    // Expire in 5 mins
    user.otpExpire =
      Date.now() + 5 * 60 * 1000;

    await user.save();
    

    // Send Email
    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Password Reset OTP",

      html: `
        <h2>Password Reset OTP</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>
          OTP valid for 5 minutes
        </p>
      `,
    });

    res.status(200).json({
      message:
        "OTP sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//verifyOtp
export const verifyOtp = async (
  req,
  res
) => {
  try {

    const {
      email,
      otp,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check OTP
    if (
      String(user.otp)
      !==
      String(otp)
    ) {

      return res.status(400).json({
        message: "Invalid OTP",
      });
      
    }

    // Check Expiry
    if (
      user.otpExpire < Date.now()
    ) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    res.status(200).json({
      message:
        "OTP verified successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//resetPassword
export const resetPassword = async (
  req,
  res
) => {
  try {

    const {
      email,
      otp,
      newPassword,
    } = req.body;

    // Find User
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Debug Logs
    console.log(
      "Entered OTP:",
      otp
    );

    console.log(
      "Stored OTP:",
      user.otp
    );

    console.log(
      "OTP Expiry:",
      user.otpExpire
    );

    // Verify OTP
    if (
      String(user.otp)
      !==
      String(otp)
    ) {

      return res.status(400).json({
        message: "Invalid OTP",
      });

    }

    // Verify Expiry
    if (
      !user.otpExpire ||
      user.otpExpire < Date.now()
    ) {

      return res.status(400).json({
        message: "OTP expired",
      });

    }

    // Hash New Password
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        salt
      );

    // Update Password
    user.password =
      hashedPassword;

    // Remove OTP
    user.otp = undefined;
    user.otpExpire = undefined;

    // Save User
    await user.save();

    res.status(200).json({
      message:
        "Password reset successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};