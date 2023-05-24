const express = require("express");
const router = express.Router();
const { getData, getDetailId, postData, putData, deleteData, getDataByEmail } = require("../controller/users");
const { protect } = require('../middleware/auth')
const upload = require('../middleware/uploadPhoto')
const validateFile = require('../middleware/validatePhoto')

router.get("/", getData);
router.get("/my-profile", protect, getDetailId);
router.get("/:email", getDataByEmail);
router.put("/update-profile", protect, upload.single('photo'), validateFile, putData);

module.exports = router
