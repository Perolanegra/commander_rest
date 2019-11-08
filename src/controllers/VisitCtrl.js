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

    async checkActiveVisitByTableId(req, res) {
        try {
            let visit = await Visit.find({ id_table: req.query.id_table, finished_at: null });
            
            if(!visit) {
                const { id_establishment } = await Table.find({ id_table: req.query.id_table, deleted_at: null });
                const new_visit = {
                    id_users: [req.params.id_user],
                    id_table: req.params.id_table,
                    id_establishment: id_establishment
                };

                visit = this.store(new_visit);
            }
    
            return res.json(visit);
            
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