const knex = require("../db/connection");

function list() {
    //select specific colums from a join table of movies and movies theaters in order to show
    //movies where is_showing is set to true
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("movies.movie_id", "title", "runtime_in_minutes", "rating", "description", "image_url")
        .where({ "is_showing": true })
        .groupBy("movies.movie_id");
}

function read(movie_id) {
    //select all columns from movies table where movie_id matches route parameter
    return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
    list,
    read,
}