const mongoose = require("mongoose");
const { INVOICE_STATUS } = require("../shared/constants");

const Schema = new mongoose.Schema({
  reference: { type: Number },
  customer: { type: String },
  status: {
    type: String, enum: INVOICE_STATUS
  },
  invoice_date: { type: Date, default: Date.now },
  due_date: { type: Date, default: Date.now },
  invoice_amount: { type: Number },
  amount_due: { type: Number },
  currency: { type: String },
  mandate_status: { type: String },

})

module.exports = mongoose.model("invoice", Schema, "invoice");