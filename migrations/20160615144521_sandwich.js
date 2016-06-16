
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sandwiches', function(table){
      table.increments();
      table.string('name');
      table.text('directions');
      table.string('imageurl');
      table.integer('rating');
      table.integer('ingredients_id').references('ingredients.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sandwiches');
};
