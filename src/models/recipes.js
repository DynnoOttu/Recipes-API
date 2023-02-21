const Pool = require('./../config/db')

const insertData = (data) => {
    let {ingredients,title,photo,users_id,category_id,slug} = data
    let time =new Date().toISOString()
  return Pool.query(
    `INSERT INTO recipes(title,ingredients,photo,users_id,created_at,category_id,slug) VALUES('${title}','${ingredients}','${photo}',${users_id},'${time}',${category_id},'${slug}')`
  );
}

const getData = (data) => {
  let {searchBy,search,sortBy,sort} = data
    console.log(data)
  return Pool.query(
    `SELECT recipes.title, recipes.ingredients, recipes.photo, recipes.created_at, recipes.users_id, recipes.category_id, recipes.slug as posttime, users.name as creator, category.name as category FROM recipes JOIN category ON recipes.category_id=category_id JOIN users ON users_id=users_id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort}`
  );
}

const updateData  = (id,data) => {
    return Pool.query(
        `UPDATE recipes SET title='${data}', ingredients='${data}', photo='${data}' WHERE id=${id}`);
}

const deleteData = (id,data) => {
  return Pool.query(
      `DELETE FROM recipes WHERE id=${id}`);
}

 
module.exports = {insertData,getData,updateData,deleteData}