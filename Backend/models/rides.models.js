

import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },

  origin: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  fare: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },

  duration: {
    type: Number,
    default: 0, // fixed
  },

  distance: {
    type: Number,
  },

  // STRIPE PAYMENT FIELDS (IMPORTANT)
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

  stripeSessionId: {
    type: String,
  },

  stripePaymentIntentId: {
    type: String,
  },

  otp: {
    type: String,
    required: true,
  },

}, { timestamps: true });

const Rides = mongoose.model("ride", rideSchema);

export default Rides;
