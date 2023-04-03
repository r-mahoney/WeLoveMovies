const service = require("./theaters.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundry");

async function list(req, res, next) {
    const { movieId } = req.params;
    //pull movieId from request parameters
    if (movieId) {
        //if you have a movie id use list theaters to list theaters data for specific movie
        const theaters = await service.listTheaters(movieId);
        res.json({ data: theaters })
    } else {
        //if you dont have a movie id, route should be /theaters so list all theaters
        const data = await service.list()
        res.json({ data })
    }

}

module.exports = {
    list: [asyncErrorBoundry(list)]
}