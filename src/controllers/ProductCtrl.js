const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) { // Retorna todos os registros
        const products = await Product.find();

        return res.json(products);
    },

    async store(req, res) {
        const postData = req.body;
        let hasData;
    
        try {
            await Product.find(postData, (e, resp) => {
                if(e) {
                    return res.status(400).send({ err: { message: 'Operation Currently Unavailable.', e } });
                }
                
                hasData = resp.length ? true : false;
            });
    
            if(hasData) {
                return res.status(409).send({ err: { message: 'Existing product.' } });
            }
    
            const produtos = await Product.create(postData);
    
            return res.send(produtos);
            
        } catch (e) {
            return res.status(400).send({ err: { message: 'Failed to insert products.', e }  });
        }
    }
}