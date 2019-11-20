const mongoose = require('mongoose');
const Command = mongoose.model('Command');
const Order = mongoose.model('Order');


module.exports = {

    // tirar o código de OrderCtrl futuramente , e por aqui.
    async getByVisitId(req, res) {
        try {
            const command = await Command.findOne({ id_visit: req.query.id_visit, deleted_at: null, status: "open" });

            return res.send(command);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível obter a comanda.', e }  });
        }
        
    }

}