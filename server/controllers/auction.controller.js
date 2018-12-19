const service = require('../services/auction.service');

class AuctionController {

    async find(request, handler) {
        const id = request.params.id;
        const data = service.find(id);
        if (id && !data) {
            return handler.response('Auction not found').code(404);
        } else {
            return data;
        }
    }

    async save(request) {
        return await service.save(request.payload);
    }

    async delete(request) {
        return service.delete(request.params.id);
    }

}
module.exports = new AuctionController();