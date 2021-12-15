const faker = require ("faker")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('floofs').del()
    .then(function () {
      // Inserts seed entries
      const todos = [];
      for (let i=0; i<100; i++){
        todos.push({
          username: faker.name.firstName(),
          imageUrl : faker.image.animals(),
          story:faker.company.catchPhrase(),
          createdAt:faker.date.past(),
          updatedAt: faker.date.recent()
         
        })
      }
        return knex('floofs').insert(todos)
    });
};