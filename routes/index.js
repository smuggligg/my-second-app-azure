const express = require("express");
const router = express.Router();

let user = null;

let connectionString = process.env.CONN_STRING

const profiles = [
  { name: "Mike", city: "Vancouver", profession: "Rapper" },
  { name: "Cindy", city: "Burnaby" },
  { name: "Joe Mama", city: "Ball Land", profession: "CIA" }
];

router.get("/", (req, res, next) => {
  //res.send('This is the index route!');
  console.log("Timestamp: " + req.timestamp);
  const data = {
    connectionString: connectionString,
    name: "Carl Weathers",
    memes: "profession statement",
    date: req.timestamp,
    profiles: profiles,
    user: user
  };
  res.render("index", data);
});

router.get("/login", (req, res, next) => {
  res.render("login", null);
});

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (password === "123") {
    user = { username: username };
    res.redirect("/");
    return;
  }

  const data = {
    message: "Please check your password and/or username."
  };
  res.render("error", data);
});

router.post("/join", (req, res, next) => {
  const body = req.body;
  profiles.push(body);
  res.redirect("/");
});

router.get("/json", (req, res, next) => {
  console.log("Timestamp: " + req.timestamp);
  const data = { name: "Joel", location: "Vancouver" };
  res.json(data);
});

router.get("/html", (req, res, next) => {
  const html =
    '<html><h1 style="color:red">This is an HTML response</h1></html>';
  res.send(html);
});

router.get("/query", (req, res, next) => {
  const query = req.query;
  res.json(query);
});

router.get("/params/:name/:location/:occupation", (req, res, next) => {
  const params = req.params;
  res.json({
    params: params
  });
});

module.exports = router;
