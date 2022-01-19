require("dotenv").config();

// const jsonServer = require("json-server");
// const path = require("path");
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const router = jsonServer.router("db.json");

// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "build")));

// app.use(
//   jsonServer.rewriter({
//     "/api/*": "/$1",
//   })
// );

// app.use("/api", jsonServer.router("db.json"));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "build", "index.html"))
//   );
// }

// app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

const express = require("express");
const jsonServer = require("json-server");

const server = express();

const PORT = process.env.PORT;
// ...

// You may want to mount JSON Server on a specific end-point, for example /api
// Optiona,l except if you want to have JSON Server defaults
// server.use('/api', jsonServer.defaults());
server.use("/api", jsonServer.router("db.json"));

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "build")));
  server.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "build", "index.html"))
  );
}

server.listen(PORT, () => console.log(`Server started on PORT 3000`));
