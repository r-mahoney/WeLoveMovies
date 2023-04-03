exports.up = function(knex) {
  return knex.schema.createTable("critics", table => {
    //create a table called critics
    //create colums for critics table
    table.increments("critic_id").primary();
    table.string("preferred_name").notNullable();
    table.string("surname").notNullable();
    table.string("organization_name");
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  //drop table when rolling back
  return knex.schema.dropTable("critics");
};