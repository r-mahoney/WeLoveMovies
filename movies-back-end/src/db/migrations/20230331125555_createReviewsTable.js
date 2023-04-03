
exports.up = function (knex) {
    return knex.schema.createTable("reviews", table => {
        //create reviews table
        //add two foreign ids referencing critic id and movie id
        table.increments("review_id").primary();
        table.text("content");
        table.integer("score");
        table.integer("critic_id").unsigned().notNullable();
        table
            .foreign("critic_id")
            .references("critic_id")
            .inTable("critics");
        table.integer("movie_id").unsigned().notNullable();
        table
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies");
        table.timestamps(true, true);

    })
};

exports.down = function (knex) {
    //drop reviews table when rolling back
    return knex.schema.dropTable("reviews");
};
