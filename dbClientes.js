const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web-app');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String
}, { collection: 'customers' }
);

module.exports = { Mongoose: mongoose, CustomerSchema: customerSchema }