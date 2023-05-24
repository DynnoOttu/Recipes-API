const pool = require("../config/db");

const findFoodRecipesById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM recipes WHERE id = ${id}`, (err, res) => {
            if (err) {
                reject(err.message);
            } else if (res.rows.length === 0) {
                reject(`Food recipe with id ${id} not found`);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = { findFoodRecipesById };