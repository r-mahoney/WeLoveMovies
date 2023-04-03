const service = require("./reviews.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundry");

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);

    if (review) {
        res.locals.review = review;
        next();
    } else {
        next({
            status: 404,
            message: "Review cannot be found."
        })
    }
}

async function list(req, res, next) {
    //get a list of all reviews
    const reviews = await service.list();
    //pull movieId from request parameters
    const { movieId } = req.params;
    //filter reviews returning any review whos movie_id matches the req.param
    const filter = reviews.filter(movieId ? review => review.movie_id == movieId : () => true);
    //since we want to use addCriticInfo on each review that matches movieId, 
    //i promise.all to wat for all the async functions to finish before returning an object containing the new review data
    const data = await Promise.all(filter.map(async (review) => {
        const critic = await service.addCriticInfo(review.review_id);
        return {...critic}
      }));
    res.json({ data })
}

async function read(req, res, next) {
    const { review: data } = res.locals;
    res.json({ data });
}

async function update(req, res, next) {
    //updatedReview is going to be all ov the review data replaced with the body of the request
    //while still using the requested review_id
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    }

    //await the update and then since the test uses sqlite3 and doesnt auto return an array of data
    //we re-read the now updated review and then addCriticInfo to the update review
    await service.update(updatedReview);
    const rereadData = await service.read(req.params.reviewId)
    const data = await service.addCriticInfo(rereadData.review_id);
    res.json({ data })
}

async function destroy(req, res, next) {
    const { review } = res.locals;

    await service.delete(review.review_id);
    res.sendStatus(204)
}

module.exports = {
    list: [asyncErrorBoundry(list)],
    read: [reviewExists, asyncErrorBoundry(read)],
    update: [reviewExists, asyncErrorBoundry(update)],
    delete: [reviewExists, asyncErrorBoundry(destroy)]
}