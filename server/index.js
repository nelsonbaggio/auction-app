const hapi = require('hapi');
const auctionRoutes = require('./routes/auction.route');
const userRoutes = require('./routes/user.route');
const bidRoutes = require('./routes/bid.route');
const mongoose = require('mongoose');
const auth = require('hapi-auth-basic');
const authUtils = require('./utils/auth.utils');

const uri = 'mongodb://localhost:27017/';

const server = hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        dbName: "auction-database"
    });

    await server.register(auth);

    server.auth.strategy('simple', 'basic', { validate: authUtils.validate });
    server.auth.default('simple');

    const loginRoute = {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            return h.response("Login successful").code(200);
        }
    }

    server.route([...auctionRoutes, ...userRoutes, ...bidRoutes, loginRoute]);

    await server.start();
    console.log(`Application server is running at: ${server.info.uri}`); ''
}



init();