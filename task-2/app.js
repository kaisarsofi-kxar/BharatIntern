
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const DbName = "BharatIntern";
// MongoDB Connection
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
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/blogRoutes'));


