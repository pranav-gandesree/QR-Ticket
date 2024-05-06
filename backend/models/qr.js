// Define QR Code Schema
const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
    data: String,
    expirationDate: Date
  });
  
  const QRCode = mongoose.model('QRCode', QRCodeSchema);

  module.exports =  QRCode ;