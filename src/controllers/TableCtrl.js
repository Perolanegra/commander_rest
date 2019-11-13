const mongoose = require('mongoose');

const Table = mongoose.model('Table');

module.exports = {

    async store(req, res) {
        const postData = req.body;
        try {

            await Table.find(postData, (e, resp) => {
                if(e) {
                    return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e } });
                }
                
                hasData = resp.length ? true : false;
            });
    
            if(hasData) {
                return res.status(409).send({ err: { message: 'Mesa já existente.' } });
            }

            const table = await Table.create(postData);
    
            return res.send(table);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
    },

    async delete(req, res) {
        try {
            const deleted = await Table.find({ _id: req.params.id }).update({ deleted_at: Date.now }).exec();
    
            return res.send(deleted);
    
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento', e }});
        }
    }

    
}