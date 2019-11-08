const express = require('express');
const routes = express.Router();

const ProductCtrl = require('./controllers/ProductCtrl');
const VisitCtrl = require('./controllers/VisitCtrl');
const TableCtrl = require('./controllers/TableCtrl');
const OrderCtrl = require('./controllers/OrderCtrl');
const EstablishmentCtrl = require('./controllers/EstablishmentCtrl');
/** Endpoints **/

/** Endpoints Produtos */
routes.get('/products', ProductCtrl.index);
routes.get('/products/getByEstablishmentId', ProductCtrl.getByEstablishmentId);
/** Fim Produtos */

/** Endpoints Instância Visita */
routes.get('/visit/getByUserId', VisitCtrl.getByUserId);
routes.get('/visit/checkActiveVisitByTableId', VisitCtrl.checkActiveVisitByTableId);

/** Fim Instância Visita */

/** Endpoints Mesa */
routes.post('/table/store', TableCtrl.store);
routes.delete('/table/delete/:id', TableCtrl.delete);
/** Fim Mesa */

/** Endpoints Pedido */
routes.post('/order/store', OrderCtrl.store);
/** Fim Pedido */

/** Endpoints Estabelecimento */
routes.post('/establishment/store', EstablishmentCtrl.store);
/** Fim Estabelecimento */

module.exports = routes;