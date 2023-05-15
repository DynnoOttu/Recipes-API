const express = require("express");
const router = express.Router();
const {
  inputRecipes,
  getRecipes,
  putRecipes,
  deleteData,
  getRecipesById,
} = require("./../controller/recipes");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/uploadPhoto");

router.post("/", protect, upload.single("photo"), inputRecipes);
router.get("/", getRecipes);
router.get("/my-recipe", protect, getRecipesById);
router.put("/:id", protect, putRecipes);
router.delete("/:id", deleteData);

module.exports = router;
