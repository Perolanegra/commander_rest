const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json());

// caso tenha usuario e senha em localhost definir user@password
const url = 'mongodb://localhost:27017/node_rest';
const opts = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

mongoose.connect(url, opts);
mongoose.Promise = global.Promise;
requireDir('./models');

app.use("/api", require("./routes"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// require('./controllers/ctrl')(app);
app.listen(3500, _ => console.log('listening to 3500'));
