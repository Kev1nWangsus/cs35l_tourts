const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// setup MongoDB connection
mongoose
  .connect(
    `mongodb+srv://Jacky:Ljn_20010430@cluster0.vxmzu.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-qdh6b1-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
