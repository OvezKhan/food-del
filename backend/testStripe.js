import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
    try {
        const balance = await stripe.balance.retrieve();
        console.log("Stripe Key is valid:", balance);
    } catch (error) {
        console.error("Invalid Stripe Key:", error.message);
    }
}

testStripe();
