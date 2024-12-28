function listRoutes(expressServer) {
    const routes = [];
    expressServer._router.stack.forEach(
        (middleware) => {
        if (middleware.route) { // Routes registered directly on the app
            routes.push({
                method: Object.keys(middleware.route.methods).join(', ').toUpperCase(),
                path: middleware.route.path,
            });
        } else if (middleware.name === 'router') { // Router middleware
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        method: Object.keys(handler.route.methods).join(', ').toUpperCase(),
                        path: handler.route.path,
                    });
                }
            });
        }
    });
    return routes;
}

module.exports = {
    listRoutes
};
