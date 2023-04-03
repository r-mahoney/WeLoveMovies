function notFound(req, res, next) {
    next({
        status: 404,
        message: `Path not found at ${req.originalUrl}`,
    })
}

module.exports = notFound;