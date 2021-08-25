const db = require('../data/db-config')

async function insertUser(user) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password','role_id'])
    return newUserObject
  }

  function getAll(){
    return db('users as u')
    .join('roles as r','u.role_id','r.role_id')
    .select('user_id','username','role_name')
  }

  function getById(id){
    return db('users').where('id',id).first()
  }
  function getBy(filter) {
    return db("users").where(filter).orderBy("user_id"); 
  }
   

  module.exports = {
    insertUser,
    getAll,
    getById,
    getBy
  }