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

/* 
TODO 
1) try removing middlewares
2) try adding "/invoices" as path with middlewares removed
3) try "/" with middlewares 
*/

//! this code will not get the data from the database. the data that is retrieved is the html doc BUT this code does allow for the app to go to pages that are not found
const jsonServer = require("json-server");
// const app = jsonServer.create();
const path = require("path");
const express = require("express");
const app = express();
//? added this dont know if it stays
const bodyParser = require("body-parser");
//! when static: "build" is removed from jsonServer.defaults() the page returns 404
//* using express.static("build") as the middlewares works
// const middlewares = jsonServer.defaults({ static: "build" });
const router = jsonServer.router("db.json");
//! changing to express.Router() did not fix issue. This just returned the html
// const router = express.Router("db.json");
const PORT = process.env.PORT || 3001;

//? added this dont know if it stays
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//* this works too
app.use(express.static(path.join(__dirname, "build")));
//? changing this to app.use("/invoices", router) fixes the 404 issues when hitting the wrong url but then doesnt server the data
//! app.use("/invoices", router);
app.use("/", router);

//* this works
// app.use("/", express.static("build"), router);

// app.use(router);
// app.use(express.static("build"));
// app.use("/", express.static("/public/index.html"), router);
// app.use("/invoices", require("./routes/invoices"));

//! seems like this is the only problem left. it's this code that doesnt work to redirect to the index.html when the wroung url is input.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

// const express = require("express");
// const jsonServer = require("json-server");
// const PORT = process.env.PORT || 3000;
// const router = jsonServer.router("db.json");

// const server = express();

// server.use("/invoices", router);

// server.listen(PORT, () => console.log(`server running on port ${PORT}`));
