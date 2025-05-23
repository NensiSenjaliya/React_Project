import express from "express";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51RObq8HOZ3LgTDitU5bYEwpnbjHieRYxxrKie2tKcvi8zJmvbGbufxnDHUNELhJPKj4T7JXYmBrOr2T27ThAJcbo006or1eNzL"); // Replace with your actual Stripe secret key
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { order } = req.body;

    if (!order || !order.ProductName || !order.price || !order.Qty) {
      console.log("Invalid order object:", order);
      return res.status(400).json({ error: "Invalid order data." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: order.ProductName,
            },
            unit_amount: order.price * 100,
          },
          quantity: order.Qty,
        },
      ],
      // success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,

    });

    console.log("Stripe session created:", session.id);
    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
