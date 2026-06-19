import Stripe from "stripe";
import Rides from "../models/rides.models.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { rideId } = req.body;
    console.log("RideId received:", rideId);

    const ride = await Rides.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Ride Fare",
            },
            unit_amount: ride.fare * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/success?rideId=${ride._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,

      metadata: {
        rideId: ride._id.toString(),
      },
    });

    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

