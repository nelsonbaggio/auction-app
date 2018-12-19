const service = require('../services/bid.service');

class BidController {

    async find(request, handler) {
        const id = request.params.id;
        const data = service.find(id);
        if (id && !data) {
            return handler.response('Bid not found').code(404);
        } else {
            return data;
        }
    }

    async save(request) {
        return await service.save(request.payload);
    }

}
module.exports = new BidController();