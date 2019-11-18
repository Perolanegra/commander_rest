const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Command = mongoose.model('Command');

module.exports = {

    async store(req, res) { // requisição que cria a comanda.
        const postData = req.body;
       
        try {
            const { _id } = await Order.create(postData);
            const command = await Command.find({ id_visit: postData.id_visit, deleted_at: null });
            // 
            if(!command) { // se não existir comanda, entra e cria.
                const new_command = {
                    id_orders: [_id],
                    id_visit: postData.id_visit
                };
                await Command.create(new_command);
                return res.status(200).send({ success: { message: 'Pedido inserido na comanda.' }  });
            }
            
            // se não só atualiza os pedidos daquela comanda.
            await Command.updateOne({ id_visit: postData.id_visit }, { $push: { id_orders: _id } });
            return res.status(200).send({ success: { message: 'Pedido inserido na comanda.' }  });
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    }
}