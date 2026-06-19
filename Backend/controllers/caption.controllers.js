import captainModel from "../models/caption.models.js";
import captainService from "../services/caption.service.js";
import Black from "../models/BlacklistToken.models.js";
import { validationResult } from "express-validator";

// Register Captain
const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Receive data from frontend
  const { fullname, email, password, mobNumber, vehicle } = req.body;

  // Check captain already exists
  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({
      message: "Captain already exist",
    });
  }

  // Hash password
  const hashedPassword = await captainModel.hashPassword(password);

  // Create captain
  const captain = await captainModel.create({
    fullname,
    email,
    mobNumber,
    password: hashedPassword,
    vehicle,
  });

  // Generate token
  const token = captain.generateAuthToken();

  // Response
  res.status(201).json({
    token,
    captain,
  });
};

// Login Captain
const loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  // Find captain
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Compare password
  const isPasswordValid = await captain.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Generate token
  const token = captain.generateAuthToken();

  // Store token in cookie
  res.cookie("captain_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({
    token,
    captain,
  });
};

// Captain Profile
const captainProfile = async (req, res) => {
  res.status(200).json({
    captain: req.captain,
  });
};

// Logout Captain
const logoutCaptain = async (req, res) => {
  res.clearCookie("captain_token");

  const token =
    req.cookies.captain_token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  await Black.create({ token });

  res.status(200).json({
    message: "Logout successfully",
  });
};

export { registerCaptain, loginCaptain, captainProfile, logoutCaptain };
