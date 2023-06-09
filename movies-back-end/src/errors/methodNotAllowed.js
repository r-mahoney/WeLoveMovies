function methodNotAllowed(req, res, next) {
    next({
        status: 405,
        message: `Method not allowed for ${req.originalUrl}`
    });
}

module.exports = methodNotAllowed;