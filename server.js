require("dotenv").config();
// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults({ static: "build" });
// const PORT = process.env.PORT || 3000;

// server.use(middlewares);
// server.use(router);

// server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

const jsonServer = require("json-server");
const app = jsonServer.create();
const path = require("path");
const express = require("express");
const middlewares = jsonServer.defaults({ static: "build" });
const router = jsonServer.router("db.json");
const PORT = process.env.PORT || 3000;

app.use("/invoices", middlewares, router);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
