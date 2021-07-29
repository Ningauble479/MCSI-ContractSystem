const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    contractid: { type: Schema.Types.ObjectId, ref: 'contracts' },
    item: { type: Schema.Types.ObjectId, ref: 'items' },
    saleid: { type: Schema.Types.ObjectId, ref: 'sales' },
    customerSerial: String,
    ourSerial: String
    
})

module.exports = mongoose.model("itemids", itemSchema);