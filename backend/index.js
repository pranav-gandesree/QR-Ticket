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
        quantity: items[0].quantity,
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




app.post('/scan-ticket', async (req, res) => {
    const { sessionId } = req.body;

    try {
        const transaction = await Transaction.findOne({ sessionId });

        if (!transaction) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (transaction.status === 'invalid') {
            return res.status(400).json({ message: 'Ticket is invalid' });
        }

        if (transaction.scanCount >= 2) {
            transaction.status = 'invalid';
            await transaction.save();
            return res.status(400).json({ message: 'Ticket has already been used twice' });
        }

        transaction.scanCount += 1;

        if (transaction.scanCount === 1) {
            transaction.entryTime = new Date();
        } else if (transaction.scanCount === 2) {
            transaction.exitTime = new Date();
        }

        await transaction.save();

        // Logic to open the servo motor
        // (you would call your specific IoT API here)

        res.status(200).json({ message: 'Ticket scanned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Ticken scanning failed', error });
    }
});


// GET endpoint to retrieve all transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transactions', error });
    }
});

// GET endpoint to retrieve a specific transaction by sessionId
app.get('/transactions/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    try {
        const transaction = await Transaction.findOne({ sessionId });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transaction', error });
    }
});

const PORT = process.env.PORT || 1111
app.listen(PORT, () => {
    console.log(`App is Listening on PORT ${PORT}`);
})
