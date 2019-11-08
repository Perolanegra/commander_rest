const mongoose = require('mongoose');

const Order = mongoose.model('Order');
const Command = mongoose.model('Command');

module.exports = {

    async store(req, res) { // requisição que guarda o pedido.
        const postData = req.body;
        // postData.items = [{ id_product: 2, qtd_product: 3 }] => parametro que vai ser recebido na request.
        // postData.id_user, postData.id_visit
        try {
            const { _id } = await Order.create(postData);
            const command = await Command.find({ id_visit: postData.id_visit, deleted_at: null });
            // 
            if(!command) {
                Command.create(_id);
            }

            await Command.update({ id_visit: postData.id_visit }, { $push: { id_orders: _id } });

            return res.send(order);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    }
}