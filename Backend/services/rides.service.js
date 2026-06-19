

import Rides from "../models/rides.models.js";
import { getDistanceTime } from "./map.service.js";
import crypto from "crypto";

async function getfare(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const distanceTime = await getDistanceTime(origin, destination);

  if (!distanceTime.distance || !distanceTime.duration) {
    throw new Error("Invalid distance or duration received");
  }

  const distanceInKm = (() => {
    const match = distanceTime.distance.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  })();

  const durationInMinutes = (() => {
    const hoursMatch = distanceTime.duration.match(/(\d+)\s*hour/);

    const minutesMatch = distanceTime.duration.match(/(\d+)\s*min/);

    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;

    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

    return hours * 60 + minutes;
  })();

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceInKm * perKmRate.auto +
        durationInMinutes * perMinuteRate.auto,
    ),

    car: Math.round(
      baseFare.car +
        distanceInKm * perKmRate.car +
        durationInMinutes * perMinuteRate.car,
    ),

    moto: Math.round(
      baseFare.moto +
        distanceInKm * perKmRate.moto +
        durationInMinutes * perMinuteRate.moto,
    ),
  };

  return fare;
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();

    return otp;
  }

  return generateOtp(num);
}

const createrides = async (data) => {
  const { User: user, origin, destination, vehicleType } = data;

  if (!user || !origin || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getfare(origin, destination);

  if (!fare[vehicleType]) {
    throw new Error(`Invalid vehicleType: ${vehicleType}`);
  }

  const ride = await Rides.create({
    user,
    origin,
    destination,
    fare: fare[vehicleType],
    otp: getOtp(5),
  });

  return ride;
};

const getconfirmedRides = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  if (!captain || !captain._id) {
    throw new Error("Captain invalid");
  }

  await Rides.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain._id,
    },
    { new: true },
  );

  const ride = await Rides.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("captain", "fullname vehicle mobNumber")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

const startride = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain || !captain._id) {
    throw new Error("All fields are required");
  }

  const ride = await Rides.findOne({
    _id: rideId,
  })
    .populate("user")
    .populate("captain", "fullname vehicle mobNumber")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted yet");
  }

  await Rides.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

  return ride;
};

const endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await Rides.findOne({
    _id: rideId,
    captain: captain._id,
  })
    .populate("user")
    .populate("captain", "fullname vehicle mobNumber")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await Rides.findOneAndUpdate({ _id: rideId }, { status: "completed" });

  return ride;
};

export { createrides, getfare, getconfirmedRides, startride, endRide };
