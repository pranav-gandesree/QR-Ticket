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
  quantity: {
    type: Number,
    default: 0,
  },
  sessionId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  scanCount: { type: Number, default: 0 },
  entryTime: Date,
  exitTime: Date,
  status: { type: String, enum: ['valid', 'invalid'], default: 'valid' }
  

});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
