const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const Command = mongoose.model('Command');
const Order = mongoose.model('Order');

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
    },

    async getByVisitId(req, res) { // request mudando tab da mesa
        try {
            const command = await Command.findOne({ id_visit: req.query.id_visit, deleted_at: null, status: "open" });

            if (!command) {
                return res.status(200).send({ success: { message: 'Comanda ainda não criada.' } });
            }

            // obtém os pedidos;
            const { id_orders } = command;
            const orders = await Order.find({ _id: { $in: id_orders }, deleted_at: null });
            let resultProducts;

            if (orders.length) {
                const itemsAll = orders.map(order => order.items);
                let productIds = [];
                let qtd_products = [];
                
                for (let i = 0; i < itemsAll.length; i++) {
                    itemsAll[i].map(item => {
                        productIds.push(item.id_product);
                        qtd_products.push(item.qtd_product);
                    });
                }

                const commandProducts = await Product.find({ _id: { $in: productIds }, deleted_at: null });

                resultProducts = productIds.map((id, key) => {
                    const product = commandProducts.find(obj => obj._id == id)
                    product.qtd = qtd_products[key];
                    return product;
                });
                
                return res.send(resultProducts);
            }

            return res.send(orders);
        } catch (e) {
            return res.status(400).send({ err: { message: 'Não foi possível obter os produtos.', e }  });
        }
    }
}