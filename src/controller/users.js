const { selectDataUsers, insertData, updateData, deleteData } = require('./../models/users')

const data = {
  users: [{
    id: 1,
    name: 'michelle'
  },
  {
    id: 2,
    name: 'dynno'
  }
  ]
}

const UsersController = {
  getDetail: async (req, res, next) => {
    const id = req.params.id
    let foundUser = await selectDataUsers()

    // eslint-disable-next-line array-callback-return
    data.users.map(item => {
      if (item.id === id) {
        foundUser = item
      }
    })

    console.log(foundUser)

    if (foundUser) {
      res.status(200).json({ status: 200, message: `data user : ${foundUser.name}` })
    } else {
      res.status(400).json({ status: 400, message: 'data user not found' })
    }
  },
  // select data users
  getData: async (req, res, next) => {
    const showUser = await selectDataUsers()
    // console.log(showUser)
    if (showUser) {
      res.status(200).json({ status: 200, message: 'data found', data: showUser.rows })
    }
    res.status(400).json({ status: 400, message: 'data user not found' })
  },
  postData: async (req, res, next) => {
    const data = {}
    data.name = req.body.name
    data.email = req.body.email
    data.phone = req.body.phone
    data.password = req.body.password

    const result = await insertData(data)

    if (!result) {
      res.status(404).json({ status: 404, message: 'input data failed' })
    }

    res.status(200).json({ status: 200, message: 'input data success ' })
  },
  putData: async (req, res, next) => {
    const id = req.params.id
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password

    const result = await updateData(id, name, email, phone, password)

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

module.exports = UsersController
