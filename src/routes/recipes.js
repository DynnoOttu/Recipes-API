const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes,putRecipes} = require('./../controller/recipes')

router.post('/',inputRecipes)
router.get('/',getRecipes)
router.put('/:id',putRecipes)

module.exports = router
