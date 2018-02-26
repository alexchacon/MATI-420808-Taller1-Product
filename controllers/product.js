const product = require('../models').product;
const amqp = require('amqplib/callback_api');

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
            .then(product => {res.status(201).send(product); sendToQueue(product.dataValues)})
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

function sendToQueue(product)
{
    //const queueIp = process.env.API_QUEUE;
    const queueIp = "192.168.50.4";

    amqp.connect('amqp://test:test@' + queueIp + ':5672', function(err, conn)
    {
        conn.createChannel(function(err, ch)
        {
            /*const q = 'test';
            ch.assertQueue(q, {durable: false});
            ch.sendToQueue(q, new Buffer(JSON.stringify(product)));*/

            const ex = 'products';

            ch.assertExchange(ex, 'fanout', {durable: false});
            ch.publish(ex, '', new Buffer(JSON.stringify(product)));

            console.log(" [x] Sent " + product);
        });
    });
}