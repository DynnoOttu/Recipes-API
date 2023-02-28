const Pool = require('./../config/db')

const insertData = (data) => {
  const { name } = data
  return Pool.query(
    `INSERT INTO category(name) VALUES('${name}')`
  )
}

const getData = () => {
  return Pool.query(
    'SELECT * FROM category'
  )
}

const updateData = (id, data) => {
  return Pool.query(
        `UPDATE category SET name='${data}' WHERE id=${id}`)
}

const deleteData = (id, data) => {
  return Pool.query(
        `DELETE FROM category WHERE id=${id}`)
}

module.exports = { insertData, getData, updateData, deleteData }
