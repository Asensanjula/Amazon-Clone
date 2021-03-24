const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")('sk_test_51IYFfZAN7EaXnZKr5sB9l0tZeuA7l9ymwzlGAuQldfIfBiPESMB009MJ4cuTuDDbMmk8fFxBRjtTWje8uMWjzpv1005MMNmpGP');

// API

// - App config
const app = express();


// - Middleware
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('Hello World'))
app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// - Listen command
exports.api = functions.https.onRequest(app)

