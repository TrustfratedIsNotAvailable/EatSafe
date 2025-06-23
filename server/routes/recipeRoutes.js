const express = require("express");
const router = express.Router();
const recipeCtrl = require("../controllers/recipeController");

router.get("/suggestions", recipeCtrl.getSuggestions);

module.exports = router;
