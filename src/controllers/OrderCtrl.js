const mongoose = require('mongoose');

const Order = mongoose.model('Order');

module.exports = {

    async store(req, res) {
        const postData = req.body;
        // postData = [{ id_product: 2, qtd_product: 3 }] => parametro que vai ser recebido na request.
        try {
            const order = await Order.create(postData);
    
            return res.send(order);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    }
}