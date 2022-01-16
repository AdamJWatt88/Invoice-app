require("dotenv").config();
//* this code works to get the data correctly but wont work on a route thats not found
// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults({ static: "build" });
// const PORT = process.env.PORT || 3000;

// server.use(middlewares);
// server.use(router);

//! this did not fix the page not found
// const path = require("path");
// server.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

//! this code will not get the data from the database. the data that is retrieved is the html doc BUT this code does allow for the app to go to pages that are not found
const jsonServer = require("json-server");
// const app = jsonServer.create();
const path = require("path");
const express = require("express");
const app = express();
const middlewares = jsonServer.defaults();
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

// const express = require("express");
// const jsonServer = require("json-server");
// const PORT = process.env.PORT || 3000;
// const router = jsonServer.router("db.json");

// const server = express();

// server.use("/invoices", router);

// server.listen(PORT, () => console.log(`server running on port ${PORT}`));
