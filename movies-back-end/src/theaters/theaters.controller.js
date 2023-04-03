const service = require("./theaters.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundry");

async function list(req, res, next) {
    const { movieId } = req.params;
    if (movieId) {
        const theaters = await service.listTheaters(movieId);
        res.json({ data: theaters })
    } else {
        const data = await service.list()
        res.json({ data })
    }

}

module.exports = {
    list: [asyncErrorBoundry(list)]
}