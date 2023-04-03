const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const theatersForMovie = reduceProperties("theater_id", {
    theater_id: ["theater_id"],
    name: ["name"]
});

const addMovies = reduceProperties("name", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    image_url: ["movies", null, "image_url"]
});

function list() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.theater_id","t.address_line_1", "t.address_line_2", "t.city", "t.name", "t.state", "t.zip", 
        "m.title", "m.rating", "m.runtime_in_minutes", "m.movie_id", "m.image_url")
        .then(addMovies)
}

function listTheaters(movie_id) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.theater_id", "t.name")
        .where({ "m.movie_id": movie_id })
        .then(theatersForMovie)
}

module.exports = {
    listTheaters,
    list,
}