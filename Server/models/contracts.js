const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractSchema = new Schema({
    companyID: { type: Schema.Types.ObjectId, ref: 'users' },
    monthlyPrice: Number,
    signed: Boolean
})

module.exports = mongoose.model("contracts", contractSchema);