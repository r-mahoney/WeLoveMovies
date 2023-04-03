const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const reviewsRouter = require("../reviews/reviews.router")

router.use("/:movieId/reviews", reviewsRouter);

router.route("/").get(controller.list);

router.route("/:movieId").get(controller.read);

module.exports = router;