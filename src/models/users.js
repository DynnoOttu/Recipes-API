const Pool = require('./../config/db')

const selectDataUsers = () => {
  return Pool.query("SELECT * from users");
};

const insertData = data => {
  console.log(data)
  const { name, email, phone, password } = data
  return Pool.query(
    `INSERT INTO users(name,email,phone,password) VALUES('${name}','${email}','${phone}',${password})`)
}

const selectUserById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  )
}



const selectDataByEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      }))
}


// const updateData = (id, data) => {
//   return Pool.query(
//     `UPDATE users SET name='${data}', email='${data}', phone='${data}',password='${data}' WHERE id=${id}`)
// }

const deleteData = (id, data) => {
  return Pool.query(
    `DELETE FROM recipes WHERE id=${id}`)
}

const findUser = (email) => {
  console.log(email)
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  )
}

const createUser = (data) => {
  const { email, fullname, password, id, otp } = data
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users(id,email,fullname,password,otp) VALUES('${id}','${email}','${fullname}','${password}','${otp}')`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    }))
}


const verifUser = (id) => {
  return Pool.query(
    `UPDATE users SET verif=1 WHERE id='${id}'`)
}

const updateUser = (data, id) => {
  let { email, password, fullname, photo } = data;

  return Pool.query(`UPDATE users SET email= '${email}',password = '${password}',fullname = '${fullname}', photo = '${photo}' WHERE users.id='${id}';`);
};

module.exports = { selectDataUsers, insertData, selectUserById, deleteData, findUser, createUser, verifUser, selectDataByEmail, updateUser }
