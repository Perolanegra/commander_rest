const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();

// caso tenha usuario e senha em localhost definir user@password
const url = 'mongodb://localhost:27017/node_rest';
const opts = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

mongoose.connect(url, opts);
mongoose.Promise = global.Promise;
requireDir('./models');

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require('./controllers/ctrl')(app);
app.listen(3500, _ => console.log('listening to 3500'));
