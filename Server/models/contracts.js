const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractSchema = new Schema({
    companyID: { type: Schema.Types.ObjectId, ref: 'users' },
    itemID: [{ type: Schema.Types.ObjectId, ref: 'items' }],
    items: [{ type: Schema.Types.ObjectId, ref: 'sales' }],
    monthlyPrice: Number,
    signed: Boolean,
    signedUS: Boolean
})


module.exports = mongoose.model("contracts", contractSchema);