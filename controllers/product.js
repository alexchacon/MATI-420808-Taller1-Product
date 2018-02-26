const product = require('../models').product;

module.exports = {
    create(req, res) {
        return product
            .create({
                name: req.body.name,
                description: req.body.description,
                weight: req.body.weight,
                width: req.body.width,
                height: req.body.height,
                depth: req.body.depth,
                information: req.body.information,
                categoryId: req.params.categoryId,
            })
            .then(product => res.status(201).send(product))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return product
            .find({
                where: {
                    id: req.params.productId,
                    categoryId: req.params.categoryId,
                },
            })
            .then(product => {
                if (!product) {
                    return res.status(404).send({
                        message: 'product Not Found',
                    });
                }

                return product
                    .update({
                        name: req.body.name || product.name,
                        description: req.body.description || product.description,
                        weight: req.body.weight || product.weight,

                        width: req.body.width || product.width,
                        height: req.body.height || product.height,
                        depth: req.body.depth || product.depth,
                        information: req.body.information || product.information,
                    })
                    .then(updatedProduct => res.status(200).send(updatedProduct))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return product
            .find({
                where: {
                    id: req.params.productId,
                    categoryId: req.params.categoryId,
                },
            })
            .then(product => {
                if (!product) {
                    return res.status(404).send({
                        message: 'product Not Found',
                    });
                }

                return product
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};