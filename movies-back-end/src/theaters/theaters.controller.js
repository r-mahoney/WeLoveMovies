const service = require("./theaters.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundry");

async function list(req, res, next) {
    const data = await service.list();
    res.json({ data })
}

module.exports = {
    list: [asyncErrorBoundry(list)]
}