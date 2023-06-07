const Pool = require('./../config/db')

const insertData = (data) => {
  const { ingredients, title, photo, users_id, category_id } = data
  const time = new Date().toISOString()
  return Pool.query(
    `INSERT INTO recipes(title,ingredients,photo,users_id,created_at,category_id) VALUES('${title}','${ingredients}','${photo}','${users_id}','${time}',${category_id})`
  )
}

const getData = (data) => {
  const { searchBy, search, sortBy, sort } = data
  return Pool.query(
    `SELECT recipes.id, recipes.title,recipes.ingredients,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.photo as photo_users, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort} LIMIT 10`
  )
}

const getDataById = (data) => {
  const { searchBy, search, sortBy, sort, id } = data
  console.log(data)
  return Pool.query(
    `SELECT recipes.id,recipes.title,recipes.ingredients,recipes.photo,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL AND recipes.users_id='${id}' ORDER BY recipes.${sortBy} ${sort}`
  )
}

const updateData = (data, id) => {
  let { title, ingredients, category_id, photo, users_id } = data;

  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE recipes SET title='${title}', ingredients='${ingredients}', category_id=${category_id}, photo='${photo}', users_id = '${users_id}'
          WHERE id = ${id} AND deleted_at IS NULL`,
      (error, result) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(result.rows[0]);
        }
      }
    );
  });
};

const deleteData = (id, data) => {
  return Pool.query(`DELETE FROM recipes WHERE id=${id}`)
}

const findUser = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE id='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      }))
};


const selectedDataById = (id) => {
  console.log(id)
  return Pool.query(
    `SELECT 
    recipes.id,
    recipes.title,
    recipes.ingredients,
    recipes.photo,
    recipes.users_id,
    users.email as creator,
    users.photo as user_photo,
    users.fullname as username,
    recipes.created_at as posttime, 
    category.name as category,
    recipes.category_id
  FROM 
    recipes 
  JOIN 
    category ON recipes.category_id=category.id
  JOIN 
    users ON users.id = users_id
  WHERE 
    recipes.id = ${id}`
  );
}



module.exports = { insertData, getData, updateData, deleteData, getDataById, findUser, selectedDataById }
