const mongoose = require('mongoose');

const connectDB = async()=>{
    return mongoose.connect('mongodb+srv://pranav8267:KpaO4sbRzsT3cc69@cluster0.swcsww6.mongodb.net/qrcodes')
    .then(()=>{console.log('connected to databse')})
    .catch((err)=>{console.log(err)});
}

module.exports = connectDB;