const User = require('../schemas/user.schema');

class UserService {

    async find(id) {
        if (id) {
            return await User.findById({ _id: id, deleted: false }).exec();
        } else {
            return await User.find().where({ deleted: false }).exec();
        }
    }

    async findByUserName(username) {
        return await User.findOne({ username: username, deleted: false }).exec();
    }

    async save(item) {
        try {
            const user = new User(item);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const user = await User.findById({ _id: id, delete: false }).exec();
            return user.delete();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();