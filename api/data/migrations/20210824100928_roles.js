
exports.up = async function(knex) {
   await knex.schema
    .createTable('roles', table=>{
        table.increments('role_id')
        table.string('role_name').unique().notNullable()
    })
   
   
   .table('users', users =>{
        users.integer('role_id')
        .notNullable()
        .unsigned()
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
};

exports.down = async function(knex) {
  await knex.schema.table('users', table=>{
      table.dropColumn('role_name')
  })
  .dropTableIfExists('roles')
};
