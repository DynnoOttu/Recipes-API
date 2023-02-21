const express = require('express')
const router = express.Router()
const Users = require('./users')
const Recipes = require('./recipes')

router.use('/users',Users)
router.use('/recipes',Recipes)


module.exports = router