const express = require('express');
const routes = express.Router();

const ProductCtrl = require('./controllers/ProductCtrl');

routes.get('/products', ProductCtrl.index);

module.exports = routes;