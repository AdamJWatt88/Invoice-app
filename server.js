const express = require("express");
const app = express();
const router = express.Router();
const config = require("config");
const connectDB = require("./config/db");
const path = require("path");

const serverless = require("serverless-http");

//Connect Database
connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/invoices", require("./routes/invoices"));

app.use("/", router);
// app.use("/.netlify/functions/server", router); // path must route to lambda

// Serve static assests in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.REACT_APP_PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// module.exports = app;
// module.exports.handler = serverless(app);
