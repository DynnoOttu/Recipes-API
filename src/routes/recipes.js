const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes,putRecipes,deleteData} = require('./../controller/recipes')

router.post('/',inputRecipes)
router.get('/',getRecipes)
router.put('/:id',putRecipes)
router.delete('/:id',deleteData)

module.exports = router
