const express = require("express");
const router = express.Router();
const config = require("config");

const Invoice = require("../models/Invoice");

// @route   GET api/invoices
// @desc    Get all invoices
// @access  Public
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.json(invoices);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/invoices/:id
// @desc    Get a single invoice
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.find({ id: req.params.id });

    res.json(invoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/invoices
// @desc    Add new invoice
// @access  Public
router.post("/", async (req, res) => {
  try {
    let newInvoice = new Invoice(req.body);

    const invoice = await newInvoice.save();

    res.send(invoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/invoices/:id
// @desc    Delete an invoice
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    let invoice = await Invoice.find({ id: req.params.id });

    if (!invoice) return res.status(404).json({ msg: "Invoice not found" });

    await Invoice.findOneAndDelete({ id: req.params.id });

    res.json({ msg: "Invoice was removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/invoices/:id
// @desc    Update an invoice
// @access  Public
router.put("/:id", async (req, res) => {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;

  console.log(id, "req.body.id");
  console.log(req.body, "req.body");

  const invoiceFields = {};
  if (id) invoiceFields.id = id;
  if (createdAt) invoiceFields.createdAt = createdAt;
  if (paymentDue) invoiceFields.paymentDue = paymentDue;
  if (description) invoiceFields.description = description;
  if (paymentTerms) invoiceFields.paymentTerms = paymentTerms;
  if (clientName) invoiceFields.clientName = clientName;
  if (clientEmail) invoiceFields.clientEmail = clientEmail;
  if (status) invoiceFields.status = status;

  // if (senderAddress.street)
  //   invoiceFields.senderAddress.street = senderAddress.street;
  // if (senderAddress.city) invoiceFields.senderAddress.city = senderAddress.city;
  // if (senderAddress.postCode)
  //   invoiceFields.senderAddress.postCode = senderAddress.postCode;
  // if (senderAddress.country)
  //   invoiceFields.senderAddress.country = senderAddress.country;

  // if (clientAddress.street)
  //   invoiceFields.clientAddress.street = clientAddress.street;
  // if (clientAddress.city) invoiceFields.clientAddress.city = clientAddress.city;
  // if (clientAddress.postCode)
  //   invoiceFields.clientAddress.postCode = clientAddress.postCode;
  // if (clientAddress.country)
  //   invoiceFields.clientAddress.country = clientAddress.country;

  if (items) invoiceFields.items = items;
  if (total) invoiceFields.total = total;

  try {
    //! i think this is not correctly finding and updating the correct invoice from MongoDb
    let invoice = await Invoice.findById(req.params.id);

    console.log(req.params.id, "req.params.id");

    if (!invoice) return res.status(404).json({ msg: "Invoice not found" });

    //! i think this is not correctly finding and updating the correct invoice from MongoDb
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { $set: invoiceFields },
      { new: true }
    );

    //? this is sending over null
    res.json(invoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
