const mongoose = require('mongoose');

const Visit = mongoose.model('Visit');
const Table = mongoose.model('Table');

module.exports = {
    async getByUserId(req, res) {
        try {
            const visit = await Visit.find({ id_users: req.query.id_user });

            return res.json(visit);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }  });
        }
        
    },

    async getByTableId(req, res) { // também cria a visita
        try {
            // se não existir retorna nulo.
            let visit = await Visit.findOne({ id_table: req.query.id_table, finished_at: null });
            
            if(!visit) { // new visit
                const {id_establishment} = await Table.findOne({ _id: req.query.id_table, deleted_at: null });
                
                const new_visit = {
                    id_users: [req.query.id_user],
                    id_table: req.query.id_table,
                    id_establishment: id_establishment
                };
                
                visit = await Visit.create(new_visit);
                return res.send(visit);
            }
            // on going visit
            // update visit with the id_user that is going to be part of the table now.
            const { _id } = visit;
            await Visit.updateOne({ _id: _id }, { $push: { id_users: req.query.id_user } }).exec();
            const updatedVisit = await Visit.findOne({ _id: _id, deleted_at: null });
            return res.send(updatedVisit);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }});
        }
    }

}