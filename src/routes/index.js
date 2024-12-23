const newsRouter = require('./news');

function route(expressServer) {

    expressServer.use('/news', newsRouter);
}

module.exports = route