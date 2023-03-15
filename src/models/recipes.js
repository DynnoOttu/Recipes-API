const Pool = require('./../config/db')

const insertData = (data) => {
  // eslint-disable-next-line camelcase
  const { ingredients, title, photo, users_id, category_id, slug } = data
  const time = new Date().toISOString()
  return Pool.query(
    // eslint-disable-next-line camelcase
    `INSERT INTO recipes(title,ingredients,photo,users_id,created_at,category_id,slug) VALUES('${title}','${ingredients}','${photo}','${users_id}','${time}',${category_id},'${slug}')`
  )
}

const getData = (data) => {
  const { searchBy, search, sortBy, sort } = data
  return Pool.query(
    `SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort} LIMIT 5`
  )
}

const getDataById = (data) => {
  const { searchBy, search, sortBy, sort, id } = data
  console.log(data)
  return Pool.query(
    `SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL AND recipes.users_id='${id}' ORDER BY recipes.${sortBy} ${sort}`
  )
}

const updateData = (id, title, ingredients, photo, categoryId) => {
  return Pool.query(
        `UPDATE recipes SET title='${title}', ingredients='${ingredients}', category_id=${categoryId} WHERE id=${id}`)
}

const deleteData = (id, data) => {
  return Pool.query(
      `DELETE FROM recipes WHERE id=${id}`)
}

module.exports = { insertData, getData, updateData, deleteData, getDataById }
