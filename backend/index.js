const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const connectDB = require('./database')
const Transaction = require('./models/Transaction'); // Import the Transaction model
require("dotenv").config();

const app = express();
app.use(cors());

const stripe = Stripe(process.env.STRIPE_URL);

app.use(express.json());


// Connect to MongoDB
connectDB();

//routes
app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body;
    console.log(items)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Price in cents
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
    });

    // Save transaction details to MongoDB
    const transaction = new Transaction({
        startPlace: items[0].startPlace,
        endPlace: items[0].endPlace,
        price: items[0].price,
        sessionId: session.id,
    });

    try {
        await transaction.save();
   
        console.log('Transaction saved successfully');
    } catch (error) {
        console.error('Error saving transaction:', error);
    }

    res.json({ id: session.id });
});

const PORT = process.env.PORT || 1111
app.listen(PORT, () => {
    console.log(`App is Listening on PORT ${PORT}`);
})
