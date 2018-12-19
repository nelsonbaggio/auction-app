const controller = require('../controllers/user.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/user/{id?}',
        handler: controller.find,
    },
    {
        method: 'DELETE',
        path: '/user/{id?}',
        handler: controller.delete
    },
    {
        method: 'PUT',
        path: '/user/',
        handler: controller.save,
        config: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    email: Joi.string().email().required(),
                    cpf: Joi.string().required(),
                    admin: Joi.boolean().required()
                }
            }
        }
    }
]