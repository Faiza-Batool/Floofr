
exports.up = function(knex) {
    return knex.schema.createTable("floofs",table=>{
        table.increments("id");
        table.string('username');
        table.text("imageUrl");
        table.text('story');
        table.timestamp("createdAt").default(knex.fn.now());
        table.timestamp("updatedAt").default(knex.fn.now());

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("floofs");
};
