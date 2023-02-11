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

    res.json(invoice);
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
  try {
    let invoice = await Invoice.find({ id: req.params.id });

    console.log(invoice);

    if (!invoice) return res.status(404).json({ msg: "Invoice not found" });

    invoice = await Invoice.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.json(invoice);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
