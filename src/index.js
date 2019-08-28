const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// caso tenha usuario e senha em localhost definir user@password
const url = 'mongodb://localhost:27017/node_rest';
const opts = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

mongoose.connect(url, opts);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Servidor online');
});

// require('./controllers/ctrl')(app);
app.listen(3500, _ => console.log('listening to 3500'));
