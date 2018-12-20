const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initialValue: {
        type: Number,
        required: true
    },
    used: {
        type: Boolean,
        required: true
    },
    responsible: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

schema.plugin(mongooseDelete, { deletedAt: true });

const Auction = mongoose.model('Auction', schema, 'auctions');

module.exports = Auction;