const service = require('../services/user.service');
const validarCPF = require('validar-cpf');

class UserController {

    
    async find(request, handler) {
        const id = request.params.id;
        const data = service.find(id);
        if (id && !data) {
            return handler.response('User not found').code(404);
        } else {
            return data;
        }
    }

    async save(request, handler) {
        if (!validarCPF(request.payload.cpf)) {
            return handler.response('Invalid CPF').code(400);
        }
        try {
            const data = await service.save(request.payload);
            return data;
        } catch (error) {
            //mongoose error code for duplicate key
            if (error.code === 11000) {
                return handler.response('Duplicate username').code(400);
            }
        }
    }

    async delete(request) {
        return await service.delete(request.params.id);
    }

}
module.exports = new UserController();