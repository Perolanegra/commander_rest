const mongoose = require('mongoose');

const Establishment = mongoose.model('Establishment');

module.exports = {

    async store(req, res) { // requisição que insere o estabelecimento.
        const postData = req.body;
        
        try {
            const establishment = await Establishment.create(postData);

            res.json(establishment);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    }
}