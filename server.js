const express = require("express");
const router = express.Router();
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect Database
connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/invoices", require("./routes/invoices"));

app.use("/", router);

// Serve static assests in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
