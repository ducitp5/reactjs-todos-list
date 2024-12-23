const newsRouter = require('./news');
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

function route(expressServer) {

    expressServer.use('/news', newsRouter);
    expressServer.use('/api/users', userRoutes);
    expressServer.use('/api/login', authRoutes);

}

module.exports = route