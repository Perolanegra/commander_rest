const mongoose = require('mongoose');

const Establishment = mongoose.model('Establishment');

module.exports = {

    async store(req, res) { // requisição que insere o estabelecimento.
        const postData = req.body;
        let hasData;

        try {
            
            await Establishment.find(postData, (e, resp) => {
                if(e) {
                    return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e } });
                }
                
                hasData = resp.length ? true : false;
            });

            if(hasData) {
                return res.status(409).send({ err: { message: 'Estabelecimento já cadastrado.' } });
            }
    
            const establishment = await Establishment.create(postData);
            
            return res.send(establishment);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    },

    async getAll(req, res) {
        
        try {
            const establishments = await Establishment.find();
            return res.send(establishments);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível retornar a lista de Estabelecimentos.', e }  });
        }

    }
}