const controller = require('../controllers/bid.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/bid/{id?}',
        handler: controller.find
    },
    {
        method: 'PUT',
        path: '/bid/',
        handler: controller.save,
        config: {
            validate: {
                payload: {
                    amount: Joi.number().min(0).required(),
                    auctionId: Joi.string().required(),
                    userId: Joi.string().required()
                }
            }
        }
    }
]