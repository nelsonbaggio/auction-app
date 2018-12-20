const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    auctionId: {
        type: String,
        ref: 'Auction',
        required: true
    }
});

const Bid = mongoose.model('bid', schema, 'bids');

module.exports = Bid;