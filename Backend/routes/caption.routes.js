import {
  registerCaptain,
  loginCaptain,
  captainProfile,
  logoutCaptain,
} from "../controllers/caption.controllers.js";

import { verifycaptain } from "../middlewares/auth.middlewares.js";

import { body } from "express-validator";

import { Router } from "express";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),

    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("mobNumber")
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number must be 10 digits"),

    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),

    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),

    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain,
);

router.post(
  "/logincaptain",
  [
    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginCaptain,
);

router.get("/profilecaptain", verifycaptain, captainProfile);

router.get("/logoutcaptain", verifycaptain, logoutCaptain);

export default router;
