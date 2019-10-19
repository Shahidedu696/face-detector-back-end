const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

const register = require("./controllors/register");
const singin = require("./controllors/signin");
const profile = require("./controllors/profile");
const image = require("./controllors/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Back-End Server is running ");
});

app.post("/signin", (req, res) => {
  singin.handleSignin(req, res, bcrypt, db);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port number ${process.env.PORT}`);
});
