const { insertData, getData, updateData, deleteData } = require('./../models/category')

const CategoryController = {
  inputCategory: async (req, res, next) => {
    const data = {}
    data.name = req.body.name

    const result = await insertData(data)

    if (!result) {
      res.status(404).json({ status: 404, message: 'input data failed' })
    }

    res.status(200).json({ status: 200, message: 'input data success ' })
  },
  getCategory: async (req, res, next) => {
    const showUser = await getData()
    // console.log(showUser)
    if (showUser) {
      res.status(200).json({ status: 200, message: 'data found', data: showUser.rows })
    }
    res.status(400).json({ status: 400, message: 'data user not found' })
  },

  putCategory: async (req, res, next) => {
    const id = req.params.id
    const name = req.body.name

    const result = await updateData(id, name)

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

module.exports = CategoryController
