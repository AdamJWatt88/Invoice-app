require("dotenv").config();

const jsonServer = require("json-server");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = jsonServer.router("db.json");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

app.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

app.use("/", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
