const controller = require('../controllers/auction.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/auction/{id?}',
        handler: controller.find
    }, {
        method: 'DELETE',
        path: '/auction/{id}',
        config: {
            handler: controller.delete,
            auth: {
                scope: ['admin']
            }
        }
    },
    {
        method: 'PUT',
        path: '/auction/',
        config: {
            handler: controller.save,
            auth: {
                scope: ['admin']
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    initialValue: Joi.number().min(0).required(),
                    used: Joi.boolean().required(),
                    responsible: Joi.string().required(),
                    startDate: Joi.date().required(),
                    endDate: Joi.date().min(Joi.ref('startDate')).required()
                }
            }
        }
    }
]