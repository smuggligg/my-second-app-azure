require("dotenv").config();
const express = require("express");
const routes = require("./routes/index");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("FIRST MIDDLEWARE!");
  req.timestamp = new Date().toString();
  next();
});

app.use("/", routes);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");

let port = process.env.PORT || 5000;

app.listen(port);
console.log(`Server is Running on localhost ${port}`);
console.log(process.env.DB_HOST);
