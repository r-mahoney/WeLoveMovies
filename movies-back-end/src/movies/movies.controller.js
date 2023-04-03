const service = require("./movies.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundry");

async function list(req, res, next) {
    const data = await service.list();
    res.json({ data });
}

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)

    if (movie) {
        res.locals.movie = movie;
        next();
    } else {
        next({
            status: 404,
            message: "Movie cannot be found."
        })
    }
}

async function read(req, res, next) {
    const { movie: data } = res.locals;
    res.json({ data })
}

module.exports = {
    list: [asyncErrorBoundry(list)],
    read: [movieExists, asyncErrorBoundry(read)],
    movieExists
}