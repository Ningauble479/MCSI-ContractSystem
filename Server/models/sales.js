const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    contractid: { type: Schema.Types.ObjectId, ref: 'contracts' },
    item: { type: Schema.Types.ObjectId, ref: 'items' },
    amount: String,
    
})

module.exports = mongoose.model("sales", itemSchema);