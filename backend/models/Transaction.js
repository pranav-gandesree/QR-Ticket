// models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  startPlace: {
    type: String,
    required: true,
  },
  endPlace: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
