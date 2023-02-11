const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  paymentDue: {
    type: String,
  },
  description: {
    type: String,
  },
  paymentTerms: {
    type: Number,
  },
  clientName: {
    type: String,
  },
  clientEmail: {
    type: String,
  },
  status: {
    type: String,
  },
  senderAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postCode: {
      type: Number,
    },
    country: {
      type: String,
    },
  },
  clientAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postCode: {
      type: Number,
    },
    country: {
      type: String,
    },
  },
  items: [
    {
      description: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  total: {
    type: Number,
  },
});

module.exports = mongoose.model("invoice", InvoiceSchema);
