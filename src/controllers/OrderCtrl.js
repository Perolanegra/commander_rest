const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Command = mongoose.model('Command');
const Product = mongoose.model('Product');

module.exports = {

    async store(req, res) { // requisição do addTotable.
        const postData = req.body;
       
        try {
            const order = await Order.create(postData);
            let command = await Command.findOne({ id_visit: postData.id_visit, deleted_at: null, status: "open" });
            // 
            if(!command) { // se não existir comanda aberta com aquela visita, entra e cria uma nova.
                const new_command = {
                    id_orders: [order._id],
                    id_visit: postData.id_visit
                };
                command = await Command.create(new_command);
                return res.status(200).send({ success: { message: 'Pedido inserido na comanda.' }, command  });
            }
            
            // se não só atualiza os pedidos daquela comanda.
            await Command.updateOne({ id_visit: postData.id_visit }, { $push: { id_orders: order._id } }).exec();
            // agora preciso retornar minha lista de produtos de pedidos da comanda atualizada.
            const { items } = order;
            const productIds = items.map(item => item.id_product);
            const commandProducts = await Product.find({ _id: { $in: productIds }, deleted_at: null });

            return res.status(200).send({ success: { message: 'Pedido inserido na comanda.' }, commandProducts, items });

        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    },

    async getByCommandId(req, res) { // request mudando tab da mesa
        try {
            const command = await Command.findOne({ id_visit: postData.id_visit, deleted_at: null, status: "open" });

            if(!command) { 
                return res.status(200).send({ success: { message: 'Comanda ainda não criada.' }  });
            }

            // obter os pedidos;

        } catch (e) {
            
        }
    }
}