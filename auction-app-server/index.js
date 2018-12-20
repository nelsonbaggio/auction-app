const hapi = require('hapi');
const auctionRoutes = require('./routes/auction.route');
const userRoutes = require('./routes/user.route');
const bidRoutes = require('./routes/bid.route');
const mongoose = require('mongoose');
const auth = require('hapi-auth-basic');
const authUtils = require('./utils/auth.utils');
const User = require('./schemas/user.schema');

const uri = 'mongodb://localhost:27017/';

const server = hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ["*"]
        }
    }
});

const init = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        dbName: "auction-database"
    });

    await insertUserRoot();

    await server.register(auth);

    server.auth.strategy('simple', 'basic', { validate: authUtils.validate });
    server.auth.default('simple');

    const loginRoute = {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            return h.response().code(200);
        }
    }

    server.route([...auctionRoutes, ...userRoutes, ...bidRoutes, loginRoute]);

    await server.start();
    console.log(`Application server is running at: ${server.info.uri}`); ''
}



init();

/**
 * Apenas para carater didático um usuário é inserido na base para criação dos outros usuários
 */
async function insertUserRoot() {
    const user = new User({
        name: 'root',
        username: 'root',
        password: 'root',
        cpf: '367020198827',
        scope: 'admin',
        email: 'root@email.com'
    });
    try {
        await user.save();
    }
    catch (error) {
        if (error.code === 11000) {
            console.log('Usuário root já existe');
        }
    }
}
