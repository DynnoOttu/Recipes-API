const Pool = require('./../config/db')

const insertData = (data) => {
  const { ingredients, title, photo, users_id, category_id } = data
  const time = new Date().toISOString()
  return Pool.query(
    `INSERT INTO recipes(title,ingredients,photo,users_id,created_at,category_id) VALUES('${title}','${ingredients}','${photo}','${users_id}','${time}',NOW()::timestamp, '${category_id}')`)
}



const getData = (data) => {
  const { searchBy, search, sortBy, sort } = data
  return Pool.query(
    `SELECT recipes.id, recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort} LIMIT 10`
  )
}

const getDataById = (data) => {
  const { searchBy, search, sortBy, sort, id } = data
  console.log(data)
  return Pool.query(
    `SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL AND recipes.users_id='${id}' ORDER BY recipes.${sortBy} ${sort}`
  )
}

const updateData = (id, title, ingredients, photo, category_id, users_id) => {
  return Pool.query(
    `UPDATE recipes SET title='${title}', ingredients='${ingredients}', photo='${photo}', category_id=${category_id}, users_id='${users_id}' WHERE id=${id}`
  )
}

const deleteData = (id, data) => {
  return Pool.query(`DELETE FROM recipes WHERE id=${id}`)
}

module.exports = { insertData, getData, updateData, deleteData, getDataById }
