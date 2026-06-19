import express from "express";
import Stripe from "stripe";
import Rides from "../models/rides.models.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// IMPORTANT: raw body required
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook Error:", err.message);
      return res.sendStatus(400);
    }

    // Payment success
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const rideId = session.metadata.rideId;

      await Rides.findByIdAndUpdate(rideId, {
        paymentStatus: "paid",
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
      });

      console.log("Payment Done:", rideId);
    }

    res.json({ received: true });
  }
);

export default router;