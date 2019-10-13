const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) { // Retorna todos os registros
        const products = await Product.find();

        return res.json(products);
    }
}