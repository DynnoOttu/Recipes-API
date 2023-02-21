const Pool = require("./../config/db")

const selectDataUsers = () => {
    return Pool.query(
        `SELECT * FROM users`
    )
}

const insertData = data => {
    let {name,email,phone,password} = data
    return Pool.query(
        `INSERT INTO users(name,email,phone,password) VALUES('${name}','${email}','${phone}',${password})`);
}

const selectDataById = (by,data) => {
    console.log(data)
    return Pool.query(
        `SELECT * FROM users WHERE ${by}='${data}'`
    )
}

const updateData = (id,data) => {
    return Pool.query(
        `UPDATE users SET name='${data}', email='${data}', phone='${data}',password='${data}' WHERE id=${id}`);
}


const deleteData = (id,data) => {
    return Pool.query(
        `DELETE FROM recipes WHERE id=${id}`);
}
module.exports = {selectDataUsers, insertData, selectDataById,updateData,deleteData}