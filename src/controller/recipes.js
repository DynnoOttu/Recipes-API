const {
  insertData,
  getData,
  updateData,
  deleteData,
  getDataById,
  findUser
} = require('./../models/recipes')
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
  putRecipes: async (req, res, next) => {
    try {
      const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: 'recipes' })

      if (!imageUrl) {
        res.status(404).json({ status: 404, message: `input data failed, failed to upload photo` })
      }
      let id = req.params.id
      let data = {};
      data.title = req.body.title;
      data.photo = imageUrl.secure_url;
      data.users_id = req.payload.id;
      data.ingredients = req.body.ingredients;
      data.category_id = req.body.category_id;

      let { rows: [users] } = await findUser(req.payload.id)

      if (!users) {
        res.status(404).json({ status: 404, message: `this recipe is not owned by you` })
      }


      let result = await updateData(id, data)

      if (!result) {
        return res.status(404).json({ status: 404, message: `update data failed` })
      }

      return res.status(200).json({ status: 200, message: `update data success` })
    } catch (err) {
      return next(res.status(404).json({ status: 404, message: err.message }));
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
