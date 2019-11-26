const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {

    async store(req, res) {
        const postData = req.body;
        
        try {

            const userFind = await User.findOne({ email: postData.email });
    
            if(userFind) {
                return res.status(409).send({ err: { message: 'Email já cadastrado.' } });
            }
           
            
            postData.birthDate = new Date(postData.birthDate);
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
    },

    async getById(req, res) { // requisição do usuário corrente.
        try {
            const user = await User.findOne({ email: req.query.email, password: req.query.password, deleted_at: null });

            return res.json(user);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Erro ao obter usuário.', e }});
        }
    }
}