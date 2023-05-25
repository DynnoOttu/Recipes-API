const express = require('express')
const router = express.Router()
const { getData, postData, deleteData, getDetail, updateDataUser, getUserByPayloadId } = require('./../controller/users')
const { protect } = require("../middleware/auth");
const upload = require("../middleware/uploadPhoto");

router.get('/', getData)
router.post('/', postData)
router.get('/:id', getDetail)
// router.put('/:id', putData)
router.delete('/:id', deleteData)
router.get("/users", protect, getUserByPayloadId);
router.put("/users", protect, upload.single("photo"), updateDataUser);

module.exports = router
