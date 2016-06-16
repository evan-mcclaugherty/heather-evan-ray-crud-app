
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ing_sand', function(table){
      table.increments();
      table.integer('ingredients_id').references('ingredients.id');
      table.integer('sandwiches_id').references('sandwiches.id');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ing_sand');
};
