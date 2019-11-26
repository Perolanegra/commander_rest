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
            let commandsClosedPromise;
            let arrayEstabs = new Array();
            const visits = await Visit.find({ id_users: { $in: [req.query.id_user] }, deleted_at: null, finished_at: { $exists: true , $ne: null } });

            if(visits.length) {

                commandsClosedPromise = visits.map(async (visit) => {
                    let respAux = { commandProducts: [], establishment: null, command: null };
                    const command = await Command.findOne({ id_visit: visit._id, deleted_at: null, status: "paid" });
                    
                    if(command) {
                        respAux.command = command;
                        const { id_orders, id_establishment } = command;

                        const establishment = await Establishment.findOne({ _id: id_establishment, deleted_at: null });
                        respAux.establishment = establishment;
                        arrayEstabs.push(establishment);
    
                        const orders = await Order.find({ _id: { $in: id_orders }, deleted_at: null });
    
                        const orderPromise = orders.map(async (order) => {
    
                            const { items } = order; // isso aqui é um array

                            const productOrderPromise = items.map(async (item) => { // retorna uma Promise de produtos. => array
                                const product = await Product.findOne({ _id: item.id_product, deleted_at: null });
                                product.qtd = item.qtd_product;
                                respAux.commandProducts.push(product);
                                return product;
                            });
                            
                            const productOrder = await Promise.all(productOrderPromise);
                            return productOrder;
                        });

                        await Promise.all(orderPromise);                        
                        return respAux;
                    }
                });

                let commandsClosed = await Promise.all(commandsClosedPromise);
                let arrayVisit;
                if(commandsClosed) {

                    const jsonObject = arrayEstabs.map(JSON.stringify); 
                    const uniqueSet = new Set(jsonObject); 
                    arrayVisit = Array.from(uniqueSet).map(JSON.parse); 
                    
                    arrayVisit.forEach((estab) => {
                        const arrayCommand = new Array();
                        const arrayCommandProds = new Array();
                        commandsClosed.forEach(async (command) => {
                            if(estab.lat == command.establishment.lat) {
                                arrayCommand.push(command.command);
                                arrayCommandProds.push(command.commandProducts);
                            }
                        });
                        
                        estab.commands = arrayCommand;
                        estab.commandProducts = arrayCommandProds;
                    });
                }

                return res.send(arrayVisit);
            }
            
            return res.send([]);
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível obter as comandas.', e }  });
        }
    }

}