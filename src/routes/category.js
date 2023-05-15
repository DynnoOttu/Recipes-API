const express = require('express')
const router = express.Router()
const { inputCategory, getCategory, putCategory, deleteData } = require('./../controller/category')

router.post('/', inputCategory)
router.get('/', getCategory)
router.put('/:id', putCategory)
router.delete('/:id', deleteData)

module.exports = router
