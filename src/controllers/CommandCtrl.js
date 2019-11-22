const mongoose = require('mongoose');
const Command = mongoose.model('Command');
const Order = mongoose.model('Order');
const Visit = mongoose.model('Visit');
const Establishment = mongoose.model('Establishment');
const Product = mongoose.model('Product');


module.exports = {

    // tirar o código de OrderCtrl futuramente , e por aqui.
    async getByVisitId(req, res) { // retorna a comanda em aberta no momento pelo id da visita;
        try {
            const command = await Command.findOne({ id_visit: req.query.id_visit, deleted_at: null, status: "open" });

            return res.send(command);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível obter a comanda.', e }  });
        }
        
    },

    async getClosedByUserId(req, res) {
        try {
            let commandProducts = [];
            let commandClosed;
            let respAux = { commandProducts: null, establishment: null };
            const visits = await Visit.find({ id_users: { $in: [req.query.id_user] }, deleted_at: null, finished_at: { $exists: true , $ne: null } });

            if(visits.length) {
                // const visitsId = visits.map(v => v._id);
                const establishmentsId = visits.map(v => v.id_establishment);
                let establishments = await Establishment.find({ _id: { $in: establishmentsId }, deleted_at: null });
                
                commandClosed = establishments.map(async (item, key) => {
                    const command = await Command.findOne({ id_establishment: item._id, deleted_at: null, status: "paid" });

                    if(command) {
                        respAux.establishment = item;
                        
                        
                        const { id_orders } = command;
                        const orders = await Order.find({ _id: { $in: id_orders }, deleted_at: null });
                        
                        let productIds = [];
                        let qtd_products = [];

                        if (orders.length) {
                            const itemsAll = orders.map(order => order.items);
                            
                            itemsAll.forEach(itemAll => { 
                                itemAll.map(item => {
                                    productIds.push(item.id_product);
                                    qtd_products.push(item.qtd_product);
                                });
                            });
                            
                            const products = await Product.find({ _id: { $in: productIds }, deleted_at: null });

                            commandProducts = productIds.map((id, key) => {
                                const product = products.find(obj => obj._id == id && obj.id_establishment == item._id);
                                product.qtd = qtd_products[key];
                                return product;
                            });
                            
                        }
                        
                        respAux.commandProducts = await Promise.all(commandProducts);
                    }
                    
                    return respAux;
                });

                const commander = await Promise.all(commandClosed);
                return res.send(commander);
            }
            
            return res.send([]);
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível obter as comandas.', e }  });
        }
    }

}