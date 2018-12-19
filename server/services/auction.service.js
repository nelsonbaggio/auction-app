const Auction = require('../schemas/auction.schema');
const bid = require('../schemas/bid.schema');

class AuctionService {

    async find(id) {
        if (id) {
            return await Auction.findById({ _id: id, deleted: false }).exec();
        } else {
            return await Auction.find({ deleted: false }).exec();
        }
    }

    async save(item) {
        const auction = new Auction(item);
        return await auction.save();
    }

    async delete(id) {
        await this.validateExistentBids(id);
        try {
            const auction = await Auction.findById({ _id: id, delete: false }).exec();
            return auction.delete();
        } catch (error) {
            throw error;
        }
    }

    async validateExistentBids(id) {
        const bids = await bid.find({ auctionId: id }).exec();
        if (!bids) {
            throw Error();
        }
    }
}

module.exports = new AuctionService();