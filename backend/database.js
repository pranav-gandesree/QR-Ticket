const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

module.exports = connectDB;
