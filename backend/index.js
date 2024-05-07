const cors = require("cors")
const express = require("express")
const { v4: uuidv4 } = require('uuid');

const qrcode = require('qrcode');
const PORT = process.env.PORT || 1111;
const connectDB= require('./database');

const QRCode = require('./models/qr')

// add a stripe key
const stripe = require("stripe")("sk_test_51PD1lpSF5YdTTtWx3ZY8OaAzOIkV4klg9YNYfNkK9PhzBmuBe6adsFcOUyDHZPlU0QX9t6lWECRPEmn7B92UhLGc0043mJLPa9");

// const uuid = require("uuid/v4");

const app = express();

//middlewwares
app.use(express.json());
app.use(cors());


//routes
app.get("/", (req, res) => {
    res.send("hello thereee !!!!!")
})

app.post("/payment", async(req,res)=>{
    const {price, token} = req.body;

    const priceId = uuidv4();

    console.log("price",price);
    console.log("priceId", priceId);

   
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // price: price, 
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:3000/qrcode', // Replace with your actual success URL
      cancel_url: 'http://localhost:3000/qrcode', // Replace with your actual cancel URL
  });

  res.json({ sessionId: session.id });
})


// app.post('/generate-qr-code', async (req, res) => {
//   const { data, expirationDate } = req.body;

//   try {
//     // Generate QR code
//     const qrCodeData = await qrcode.toDataURL(data);

//     // Save QR code to database
//     const qrCode = new QRCode({
//       data: qrCodeData,
//       expirationDate: expirationDate
//     });
//     await qrCode.save();

//     res.status(200).json({ success: true, imagePath: qrCodeData, message: 'QR code generated and saved successfully.' });
//   } catch (error) {
//     console.error('Error generating and saving QR code:', error);
//     res.status(500).json({ success: false, message: 'Error generating and saving QR code.' });
//   }
// });




// Generate and save QR code
app.post('/generate-qr-code', async (req, res) => {
  const { data } = req.body;

  try {
    // Check if the QR code has been scanned before
    const existingQRCode = await QRCode.findOne({ data });

    if (existingQRCode && existingQRCode.scanned) {
      return res.status(400).json({ success: false, message: 'QR code has already been scanned.' });
    }

    // Generate QR code
    const qrCodeData = await qrcode.toDataURL(data);

    // Save QR code to database (mark as scanned)
    if (existingQRCode) {
      // If QR code already exists, update the scanned flag
      existingQRCode.scanned = true;
      await existingQRCode.save();
    } else {
      // If QR code does not exist, create a new one
      await QRCode.create({ data, scanned: true });
    }

    res.status(200).json({ success: true, imagePath: qrCodeData, message: 'QR code generated and saved successfully.' });
  } catch (error) {
    console.error('Error generating and saving QR code:', error);
    res.status(500).json({ success: false, message: 'Error generating and saving QR code.' });
  }
});













//listen
app.listen(PORT, async() => {
    await connectDB();
    console.log('Server is running on port 1111');
});