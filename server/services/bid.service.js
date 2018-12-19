const Bid = require('../schemas/bid.schema');
const auctionService = require('./auction.service');

class BidService {

    async find(id) {
        if (id) {
            return await Bid.findById({ _id: id }).exec();
        } else {
            return await Bid.find().exec();
        }
    }

    async save(item) {
        const auction = await auctionService.find(item.auctionId);
        if (auction && auction.endDate < new Date()) {
            throw new Error();
        }
        
        await this.validateMinimal(item, auction);
        await this.validateBigger(item);
        
        const data = new Bid(item);
        return data.save();
    }


    async validateMinimal(item, auction) {
        if (auction.initialValue > item.amout) {
            throw new Error();
        }
    }

    async validateBigger(item) {
        const currentBids = await Bid.find({ auctionId: item.auctionId }).exec();
        const highestBids = await currentBids.filter(current => current.amout >= item.amout);
        if (!highestBids) {
            throw new Error('Small bid! pay more');
        }
    }
}

module.exports = new BidService();