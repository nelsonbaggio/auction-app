const userService = require('../services/user.service');
const bcrypt = require('bcrypt');

class AuthUtils {

    async validate(request, username, password) {
        const user = await userService.findByUserName(username);
        if (!user) {
            return { credentials: null, isValid: false, admin: false };
        }
        const isValid = await bcrypt.compare(password, user.password);
        const credentials = { id: user._id, name: user.name, admin: user.admin };
        return { isValid, credentials };
    };

}
module.exports = new AuthUtils();