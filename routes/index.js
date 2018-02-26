const categoriesController = require('../controllers').category;
const productsController = require('../controllers').product;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the categories API!',
    }));

    app.post('/api/categories', categoriesController.create);
    app.get('/api/categories', categoriesController.list);
    app.post('/api/products/:categoryId/product', productsController.create);
    app.get('/api/categories/:categoryId', categoriesController.retrieve);
    app.put('/api/categories/:categoryId', categoriesController.update);
    app.delete('/api/categories/:categoryId', categoriesController.destroy);
    app.put('/api/categories/:categoryId/products/:productId', productsController.update);
    app.delete('/api/categories/:categoryId/products/:productId', productsController.destroy);

    app.all('/api/categories/:categoryId/products', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
        }));
};