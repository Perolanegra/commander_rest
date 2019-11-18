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

    async getByTableId(req, res) {
        try {
            let visit = await Visit.find({ id_table: req.query.id_table, finished_at: null });
            
            if(!visit) { // new visit
                const { id_establishment } = await Table.find({ id_table: req.query.id_table, deleted_at: null });
                const new_visit = {
                    id_users: [req.query.id_user],
                    id_table: req.query.id_table,
                    id_establishment: id_establishment
                };
                
                visit = this.store(new_visit);
                return res.send(false);
            }
            // on going visit
            // update visit with the id_user that is going to be part of the table now.
            const { _id } = visit;
            visit = await Visit.update({ _id: _id }, { $push: { id_users: req.query.id_user } });
            return res.send(true);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }});
        }
    },

    async store(params) {
        try {
            const visit = await Visit.create(params);
    
            return visit;
            
        } catch (e) {
            return { err: { message: 'Operação Indisponível no momento.', e }  };
        }
    }
}