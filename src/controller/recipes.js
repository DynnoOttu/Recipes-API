const {
  insertData,
  getData,
  updateData,
  deleteData,
  getDataById,
  findUser
} = require('./../models/recipes')
const { findFoodRecipesById } = require("../middleware/verifyUser");
const cloudinary = require('../config/photo')

const RecipesController = {
  inputRecipes: async (req, res, next) => {
    try {
      const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: 'recipes' })

      console.log('imageUrl', imageUrl)


      if (!imageUrl) {
        return res
          .status(404)
          .json({
            status: 404,
            message: 'input data failed failed to upload photo'
          })
      }

      const data = {}
      data.title = req.body.title
      data.photo = imageUrl.secure_url
      data.users_id = req.payload.id
      data.ingredients = req.body.ingredients
      data.category_id = req.body.category_id
      data.slug = req.body.slug

      const result = await insertData(data)

      if (!result) {
        return res.status(404).json({ status: 404, message: 'input data failed' })
      }

      return res.status(200).json({ status: 200, message: 'input data success ' })
    } catch (err) {
      return next(res.status(404).json({ status: 404, message: err.message }));
    }

  },
  getRecipes: async (req, res, next) => {
    const { searchBy, search, sortBy, sort } = req.query
    const data = {
      searchBy: searchBy || 'title',
      search: search || '',
      sortBy: sortBy || 'created_at',
      sort: sort || 'ASC'
    }
    const result = await getData(data)

    if (!result) {
      res.status(404).json({ status: 404, message: 'get data failed' })
    }

    res
      .status(200)
      .json({ status: 200, message: 'get data success', data: result.rows })
  },
  getRecipesById: async (req, res, next) => {
    const { searchBy, search, sortBy, sort } = req.query
    const data = {
      searchBy: searchBy || 'title',
      search: search || '',
      sortBy: sortBy || 'created_at',
      sort: sort || 'ASC',
      id: req.payload.id
    }
    const result = await getDataById(data)

    if (!result) {
      res.status(404).json({ status: 404, message: 'get data failed' })
    }

    res
      .status(200)
      .json({ status: 200, message: 'get data success', data: result.rows })
  },

  selectDataById: async (req, res, next) => {
    try {
      let id = req.params.id

      let result = await selectedDataById(id)

      if (result.rows[0]) {
        res.status(200).json({ status: 200, message: `data recipe found`, data: result.rows })
      } else {
        res.status(400).json({ status: 400, message: `data recipe not found` })
      }
    } catch (err) {
      return next(res.status(404).json({ status: 404, message: err.message }));
    }
  },
  putRecipes: async (req, res, next) => {
    try {
      let id = req.params.id;

      let selectDataById = await findFoodRecipesById(id);
      let currentRecipe = selectDataById.rows[0];

      if (req.file) {
        let imageUrl = await cloudinary.uploader.upload(req.file.path, {
          folders: "recipes",
        });

        if (!imageUrl) {
          res.status(401).json({
            message: "input power is replaced",
          });
        }

        let data = {
          title: req.body.title || currentRecipe.title,
          ingredients: req.body.ingredients || currentRecipe.ingredients,
          category_id: req.body.category_id || currentRecipe.category_id,
          photo: imageUrl.secure_url || currentRecipe.photo,
          users_id: req.payload.id || currentRecipe.users_id,
        };

        if (data.users_id != currentRecipe.users_id || req.payload.id != currentRecipe.users_id) {
          res.status(403).json({
            message: "sorry not your recipe",
          });
        } else {
          await updateData(data, id);

          res.status(200).json({
            message: "data updated successfully",
          });
        }
      } else {
        let data = {
          title: req.body.title || currentRecipe.title,
          ingredients: req.body.ingredients || currentRecipe.ingredients,
          category_id: req.body.category_id || currentRecipe.category_id,
          photo: currentRecipe.photo,
          users_id: req.payload.id || currentRecipe.users_id,
        };

        console.log(data)
        if (data.users_id != currentRecipe.users_id || req.payload.id != currentRecipe.users_id) {
          res.status(403).json({
            message: "Access Denied",
          });
        } else {
          await updateData(data, id);

          res.status(200).json({
            message: "Data has been updated",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
      console.log(error)
    }
  },
  deleteData: async (req, res, next) => {
    const id = req.params.id
    const result = await deleteData(id)

    console.log(result)

    if (!result) {
      res.status(404).json({ status: 404, message: 'delete data failed' })
    }

    res
      .status(200)
      .json({
        status: 200,
        message: 'delete data success',
        data: `${id} deleted`
      })
  }
}

module.exports = RecipesController
