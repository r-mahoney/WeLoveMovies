exports.up = function (knex) {
    return knex.schema.createTable("movies_theaters", table => {
        //create movies_theaters table with two foreign ids
        //referencing movie id and theater id
        table.integer("movie_id").unsigned().notNullable();
        table
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("CASCADE");
        table.integer("theater_id").unsigned().notNullable();
        table
            .foreign("theater_id")
            .references("theater_id")
            .inTable("theaters")
            .onDelete("CASCADE");
        table.boolean("is_showing");
    })
};

exports.down = function (knex) {
    //drop movies_theaters table on rollback
    return knex.schema.dropTable("movies_theaters")
};
