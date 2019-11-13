const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {

    async store(req, res) {
        const postData = req.body;
        try {

            await User.find(postData, (e, resp) => {
                if(e) {
                    return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e } });
                }
                
                hasData = resp.length ? true : false;
            });
    
            if(hasData) {
                return res.status(409).send({ err: { message: 'Usuário já existente.' } });
            }

            const user = await User.create(postData);
    
            return res.send(user);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Erro ao inserir registro de mesa.', e }  });
        }
    },

    async delete(req, res) { // params pois o id é obrigatório
        try {
            const deleted = await User.find({ _id: req.params.id }).update({ deleted_at: Date.now }).exec();
    
            return res.send(deleted);
    
        } catch (e) {
            return res.status(400).send({ err: { message: 'Erro ao deletar registro de usuário.', e }});
        }
    },

    async getAll(req, res) {
        try {
            const Users = await User.find();

            return res.json(Users);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Erro ao obter todos os usuários.', e }});
        }
    }
}