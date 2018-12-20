const userService = require('../services/user.service');
const bcrypt = require('bcrypt');

class AuthUtils {

    async validate(request, username, password) {
        console.log(username, password);
        const user = await userService.findByUserName(username);
        if (!user) {
            return { credentials: null, isValid: false, scope: false };
        }
        const isValid = await bcrypt.compare(password, user.password);
        console.log(isValid);
        const credentials = { id: user._id, name: user.name, scope: user.scope };
        return { isValid, credentials };
    };

}
module.exports = new AuthUtils();