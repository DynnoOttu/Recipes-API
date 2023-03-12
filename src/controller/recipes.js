const { insertData, getData, updateData, deleteData, getDataById } = require('./../models/recipes')
const cloudinary = require('../config/photo')

const RecipesController = {
  inputRecipes: async (req, res, next) => {
    const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: 'food' })
    console.log('image url', imageUrl)

    const data = {}
    data.title = req.body.title
    data.photo = imageUrl.secure_url
    data.users_id = req.payload.id
    data.ingredients = req.body.ingredients
    data.category_id = req.body.category_id
    data.slug = req.body.slug

    const result = await insertData(data)

    if (!result) {
      res.status(404).json({ status: 404, message: 'input data failed' })
    }

    res.status(200).json({ status: 200, message: 'input data success ' })
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

    res.status(200).json({ status: 200, message: 'get data success', data: result.rows })
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

    res.status(200).json({ status: 200, message: 'get data success', data: result.rows })
  },
  putRecipes: async (req, res, next) => {
    const id = req.params.id
    const title = req.body.title
    const ingredients = req.body.ingredients
    const categoryId = req.body.category_id
    const photo = req.body.photo
    const usersId = req.body.users_id

    if (usersId !== req.payload.users_id) {
      res.status(404).json({ status: 404, message: 'please login' })
    }

    const result = await updateData(id, title, ingredients, categoryId, photo, usersId)

    if (!result) {
      res.status(404).json({ status: 404, message: 'data input not found' })
    }

    res.status(200).json({ status: 200, message: 'update data success' })
  },
  deleteData: async (req, res, next) => {
    const id = req.params.id
    const result = await deleteData(id)

    console.log(result)

    if (!result) {
      res.status(404).json({ status: 404, message: 'delete data failed' })
    }

    res.status(200).json({ status: 200, message: 'delete data success', data: `${id} deleted` })
  }
}

module.exports = RecipesController
