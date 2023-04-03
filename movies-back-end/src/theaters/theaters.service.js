const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const theatersForMovie = reduceProperties("theater_id", {
    //one reducer function for when you specify a movie
    //returns theater name and theater_id for each theater_id
    theater_id: ["theater_id"],
    name: ["name"]
});

const addMovies = reduceProperties("name", {
    //reduce based on theater name each of these attributes when you dont
    //specify a movie_id
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    image_url: ["movies", null, "image_url"]
});

function list() {
    //listing all theaters, join movies to thaeters using the movies_theaters join table
    //then select specific columns and reduce the results using addMovies
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.theater_id","t.address_line_1", "t.address_line_2", "t.city", "t.name", "t.state", "t.zip", 
        "m.title", "m.rating", "m.runtime_in_minutes", "m.movie_id", "m.image_url")
        .then(addMovies)
}

function listTheaters(movie_id) {
    //passing a movie_is as an argument, join movies to theaters using the movies_theaters join table
    //select specific colums where movie_id matches column movie_id
    //then reduce results with theatersForMovie
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