const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {

    async getByEstablishmentId(req, res) { // requisição do cardápio
        try {
            const products = await Product.find({ id_establishment: req.query.id_establishment, deleted_at: null });

            return res.json(products);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }});
        }
    },

    async getAll(req, res) {
        try {
            const products = await Product.find();

            return res.send(products);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e }});
        }
    },

    async store(req, res) { // Cadastrar Produtos
        const postData = req.body;
        let hasData;
    
        try {
            await Product.find(postData, (e, resp) => {
                if(e) {
                    return res.status(400).send({ err: { message: 'Operação Indisponível no momento.', e } });
                }
                
                hasData = resp.length ? true : false;
            });
    
            if(hasData) {
                return res.status(409).send({ err: { message: 'Produto já existente.' } });
            }
    
            const products = await Product.create(postData);
    
            return res.send(products);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Falha ao inserir Produtos.', e }  });
        }
    }
}