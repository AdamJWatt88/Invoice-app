const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const invoices = await axios.get(
      `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`
    );
    res.json(invoices);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
