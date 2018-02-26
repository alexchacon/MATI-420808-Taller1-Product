const category = require('../models').category;
const product = require('../models').product;

module.exports = {
    create(req, res) {
        return category
            .create({
                name: req.body.name,
                description: req.body.description,
            })
            .then(category => res.status(201).send(category))
            .catch(error => res.status(400).send(error));
    },
   /* list(req, res) {
        return category
            .all()
            .then(category => res.status(200).send(category))
            .catch(error => res.status(400).send(error));
    },*/

    list(req, res) {
        return category
            .findAll({
                include: [{
                    model: product,
                    as: 'products',
                }],
            })
            .then(categories => res.status(200).send(categories))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        return category
            .findById(req.params.categoryId, {
                include: [{
                    model: product,
                    as: 'products',
                }],
            })
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }
                return res.status(200).send(category);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return category
            .findById(req.params.categoryId, {
                include: [{
                    model: product,
                    as: 'products',
                }],
            })
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }
                return category
                    .update({
                        name: req.body.name || category.name,
                        description: req.body.description || category.description,
                    })
                    .then(() => res.status(200).send(category))  // Send back the updated category.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return category
            .findById(req.params.categoryId)
            .then(category => {
                if (!category) {
                    return res.status(400).send({
                        message: 'Category Not Found',
                    });
                }
                return category
                    .destroy()
                    //.then(() => res.status(204).send())
                    .then(() => res.status(200).send({ message: 'Todo deleted successfully.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};