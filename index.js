const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// require('./controllers/ctrl')(app);

app.listen(3500, _ => console.log('listening to 3500'));
