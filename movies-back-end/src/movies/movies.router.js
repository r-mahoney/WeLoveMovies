const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const reviewsRouter = require("../reviews/reviews.router")
const theatersRouter = require("../theaters/theaters.router")

//use reviews router at the movies/:moviesId/reviews route
//to display any reviews pertaining to teh specific movie_id
router.use("/:movieId/reviews", reviewsRouter);

//use thaeterRoute at the movies/:movieId/theaters route 
//to display the theaters currently showing the specified movie
router.use("/:movieId/theaters", theatersRouter);

//add list method at root route to get a list of all movies and dont allow any other methods at the route
router.route("/").get(controller.list).all(methodNotAllowed);

//add read method to :movieId route to show specific movie. Dont allow any other methods
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;