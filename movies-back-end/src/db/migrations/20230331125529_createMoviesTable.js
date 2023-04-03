exports.up = function(knex) {
  return knex.schema.createTable("movies", table => {
    //create moveis table and add columns
    table.increments("movie_id").primary();
    table.string("title").notNullable();
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.text("description");
    table.string("image_url");
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  //drop moveis table on roll back
  return knex.schema.dropTable("movies")
};
