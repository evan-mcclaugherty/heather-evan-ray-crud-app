exports.seed = function(knex, Promise) {
    return Promise.join(
            // Deletes ALL existing entries
            knex('ingredients').del(),
            knex('sandwiches').del(),
            knex('ing_sand').del()
        )
        .then(function() {
            return Promise.join(
                knex('ingredients').insert({
                    name: 'bacon'
                }).returning('id'),
                knex('ingredients').insert({
                    name: 'lettuce'
                }).returning('id'),
                knex('ingredients').insert({
                    name: 'tomato'
                }).returning('id')
            );
        })
        .then(function(ids) {
            var baconId = ids[0][0],
                lettuceId = ids[1][0],
                tomatoId = ids[2][0];
            return Promise.join(
                knex('sandwiches').insert({
                    name: 'blt',
                    directions: 'Just make the thing',
                    imageurl: 'https://bacontoday.com/wp-content/uploads/2014/08/bbbblt-486x290.jpg',
                    rating: 5,
                }).returning('id')
            ).then(function(sandId) {
                return {
                    sandwiches: sandId[0][0],
                    ingredients: {
                        baconId: baconId,
                        lettuceId: lettuceId,
                        tomatoId: tomatoId
                    }
                };
            });
        })
        .then(function(data) {
            return Promise.join(
                knex('ing_sand').insert({
                    ingredients_id: data.ingredients.baconId,
                    sandwiches_id: data.sandwiches
                }),
                knex('ing_sand').insert({
                    ingredients_id: data.ingredients.lettuceId,
                    sandwiches_id: data.sandwiches
                }),
                knex('ing_sand').insert({
                    ingredients_id: data.ingredients.tomatoId,
                    sandwiches_id: data.sandwiches
                })
            );
        });
};
