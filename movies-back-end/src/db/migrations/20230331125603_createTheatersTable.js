exports.up = function(knex) {
  return knex.schema.createTable("theaters", table=> {
    //create theaters table as well as related columns
    table.increments("theater_id").primary();
    table.string("name");
    table.string("address_line_1");
    table.string("address_line_2");
    table.string("city");
    table.string("state");
    table.string("zip");
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  //drop theaters table when rolling back
  return knex.schema.dropTable("theaters");
};
