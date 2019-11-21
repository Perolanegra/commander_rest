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
            let resultCommand = [];
            let commandClosed = [];
            let respAux = { commandProducts: null, establishment: null };
            const visits = await Visit.find({ id_users: { $in: [req.query.id_user] }, deleted_at: null, finished_at: { $exists: true , $ne: null } });

            if(visits.length) {
                const visitsId = visits.map(v => v._id);
                const establishmentsId = visits.map(v => v.id_establishment);

                const commands = await Command.find({ id_visit: { $in: visitsId }, deleted_at: null, status: "paid" });
                let establishments = await Establishment.find({ _id: { $in: establishmentsId }, deleted_at: null });

                if(commands.length) {
                    const ordersId = commands.map(c => c.id_orders);
                    const orders = await Order.find({ _id: { $in: ordersId }, deleted_at: null });
    
                    if (orders.length) {
                        const itemsAll = orders.map(order => order.items);
                        let productIds = [];
                        let qtd_products = [];
                        
    
                        for (let i = 0; i < itemsAll.length; i++) {
                            itemsAll[i].map(item => {
                                productIds.push(item.id_product);
                                qtd_products.push(item.qtd_product);
                            });
                        }

                        const commandProducts = await Product.find({ _id: { $in: productIds }, deleted_at: null });
    
                        commandClosed = establishments.map((item, key) => {
                            respAux.establishment = item;
                            resultCommand = productIds.map((id, key) => {
                                const product = commandProducts.find(obj => obj._id == id && obj.id_establishment == item._id);
                                product.qtd = qtd_products[key];
                                return product;
                            });

                            respAux.commandProducts = resultCommand;
                            return respAux;
                        });

                    }
                }
            }
            
            return res.send(commandClosed);
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível obter as comandas.', e }  });
        }
    }

}