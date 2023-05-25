const { selectDataUsers, insertData, updateData, deleteData, selectUserById, updateUser } = require('./../models/users')
const cloudinary = require('../config/photo')

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
  // putData: async (req, res, next) => {
  //   const id = req.params.id
  //   const name = req.body.name
  //   const email = req.body.email
  //   const phone = req.body.phone
  //   const password = req.body.password

  //   const result = await updateUser(id, name, email, phone, password)

  //   if (!result) {
  //     res.status(404).json({ status: 404, message: 'data input not found' })
  //   }

  //   res.status(200).json({ status: 200, message: 'update data success' })
  // },

  getUserByPayloadId: async (req, res) => {
    let id = req.payload.id;

    try {
      let result = await selectUserById(id);

      res.status(200).json({
        message: "User data foundr",
        data: result.rows,
      });
    } catch (error) {
      res.status(401).json({
        message: "user not found",
      });
    }
  },

  updateDataUser: async (req, res) => {
    let id = req.payload.id;

    const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: 'recipes' })

    if (!imageUrl) {
      res.status(401).json({
        message: "Failed to input data, please try again later",
      });
    }

    try {
      let checking = await selectUserById(id);
      let current = checking.rows[0];

      let data = {};
      data.email = req.body.email || current.email;
      data.password = req.body.password || current.password;
      data.fullname = req.body.fullname || current.fullname;
      data.photo = imageUrl.secure_url || current.photo;

      if (checking.rows[0].id !== id) {
        res.status(404).json({
          message: "data user not found",
        });
      } else {
        await updateUser(data, id);

        res.status(200).json({
          message: "data update successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
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
