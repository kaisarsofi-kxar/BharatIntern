const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const User = require("./models/User.js");

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const DbName = "BharatIntern";

mongoose
  .connect(`${process.env.MONGODB_URI}/${DbName}`)
  .then(() => {
    console.log("mongoose connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongodb server error ", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect("userExist");
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    });

    await newUser.save();

    res.redirect("success");
  } catch (error) {
    console.error(error);
    res.redirect("failed");
  }
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/public/pages/success.html");
});
app.get("/failed", (req, res) => {
  res.sendFile(__dirname + "/public/pages/failed.html");
});
app.get("/userExist", (req, res) => {
  res.sendFile(__dirname + "/public/pages/userExist.html");
});
