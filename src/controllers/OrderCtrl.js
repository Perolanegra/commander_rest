const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Command = mongoose.model('Command');
const Product = mongoose.model('Product');

module.exports = {

    async store(req, res) { // requisição do addTotable. POG desgraçado, mas dps ajeito, foi correria felipe.
        const postData = req.body;

        try {
            const order = await Order.create(postData);
            let command = await Command.findOne({ id_visit: postData.id_visit, deleted_at: null, status: "open" });
            // 
            if (!command) { // se não existir comanda aberta com aquela visita, entra e cria uma nova.
                const new_command = {
                    id_orders: [order._id],
                    id_visit: postData.id_visit
                };

                command = await Command.create(new_command);
                const { id_orders } = command;
                const orders = await Order.find({ _id: { $in: id_orders }, deleted_at: null });
                let resultProducts;

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

                    resultProducts = productIds.map((id, key) => {
                        const product = commandProducts.find(obj => obj._id == id)
                        product.qtd = qtd_products[key];
                        return product;
                    });

                }

                return res.send(resultProducts);
            }

            // se não só atualiza os pedidos daquela comanda.
            await Command.updateOne({ id_visit: postData.id_visit }, { $push: { id_orders: order._id } }).exec();
            command = await Command.findOne({ id_visit: postData.id_visit, deleted_at: null, status: "open" });

            const { id_orders } = command;
            const orders = await Order.find({ _id: { $in: id_orders }, deleted_at: null });
            let resultProducts;

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

                resultProducts = productIds.map((id, key) => {
                    const product = commandProducts.find(obj => obj._id == id)
                    product.qtd = qtd_products[key];
                    return product;
                });

            }

            return res.send(resultProducts);

        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e } });
        }
    }

}