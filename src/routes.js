const express = require('express');
const routes = express.Router();

const ProductCtrl = require('./controllers/ProductCtrl');
const VisitCtrl = require('./controllers/VisitCtrl');
const TableCtrl = require('./controllers/TableCtrl');
/** Endpoints **/

/** Endpoints Produtos */
routes.get('/products', ProductCtrl.index);
/** Fim Produtos */

/** Endpoints Instância Visita */
routes.get('/visit/getByUserId', VisitCtrl.getByUserId);
routes.get('/visit/checkActiveVisitByTableId', VisitCtrl.checkActiveVisitByTableId);

/** Fim Instância Visita */

/** Endpoints Mesa */
routes.post('/table/store', TableCtrl.store);
routes.delete('/table/delete/:id', TableCtrl.delete);
/** Fim Mesa */


module.exports = routes;