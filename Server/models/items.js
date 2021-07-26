const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: String,
    price: String,
    specificContracts: [String]
})

module.exports = mongoose.model("items", itemSchema);