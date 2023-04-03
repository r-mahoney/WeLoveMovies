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
    const reviews = await service.list();
    const { movieId } = req.params;
    const filter = reviews.filter(movieId ? review => review.movie_id == movieId : () => true);
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
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    }

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