const express = require('express');
const routes = express.Router();

const ProductCtrl = require('./controllers/ProductCtrl');
const VisitCtrl = require('./controllers/VisitCtrl');
const TableCtrl = require('./controllers/TableCtrl');
const OrderCtrl = require('./controllers/OrderCtrl');
const EstablishmentCtrl = require('./controllers/EstablishmentCtrl');
const UserCtrl = require('./controllers/UserCtrl');
const CommandCtrl = require('./controllers/CommandCtrl');
/** Endpoints **/

/** Endpoints Produtos */
routes.get('/products/getByEstablishmentId', ProductCtrl.getByEstablishmentId);
routes.get('/products', ProductCtrl.getAll);
routes.post('/products/store', ProductCtrl.store);
routes.get('/products/getByVisitId', ProductCtrl.getByVisitId);
/** Fim Produtos */

/** Endpoints Instância Visita */
routes.get('/visit/getByUserId', VisitCtrl.getByUserId);
routes.get('/visit/getByTableId', VisitCtrl.getByTableId);
routes.post('/visit/closeByIdTable', VisitCtrl.closeByIdTable);
/** Fim Instância Visita */

/** Endpoints Mesa */
routes.get('/table/getAll', TableCtrl.getAll);
routes.post('/table/store', TableCtrl.store);
routes.delete('/table/delete/:id', TableCtrl.delete);
/** Fim Mesa */

/** Endpoints Pedido */
routes.post('/orders/store', OrderCtrl.store);
/** Fim Pedido */

/** Endpoints Estabelecimento */
routes.get('/establishments', EstablishmentCtrl.getAll);
routes.post('/establishments/store', EstablishmentCtrl.store);
/** Fim Estabelecimento */

/** Endpoints Usuário */
routes.get('/user', UserCtrl.getAll);
routes.get('/user/authenticate', UserCtrl.getById);
routes.post('/user/register', UserCtrl.store);
/** Fim Usuário */

/** Endpoints Commanda */
routes.get('/command/getClosedByUserId', CommandCtrl.getClosedByUserId);
routes.get('/command/getByVisitId', CommandCtrl.getByVisitId);
/** Fim Commanda */


module.exports = routes;