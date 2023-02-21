const express = require('express')
const router = express.Router()
const {getData, postData,putData,deleteData,getDetail} = require('./../controller/users')

router.get('/',getData)
router.post('/',postData)
router.get('/:id',getDetail)
router.put('/:id',putData)
router.delete('/:id',deleteData)

module.exports = router
