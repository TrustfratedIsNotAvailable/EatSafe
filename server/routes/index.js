const express = require('express');
const router = express.Router();

// Import individual route modules
const foodRoutes = require("./foodRoutes");
const notesRoutes = require("./noteRoutes");
const usersRoutes = require("./userRoutes");
const reviewsRoutes = require("./reviewRoutes");
const recipesRoutes = require("./recipeRoutes");

// Mount them under their respective paths
router.use('/food', foodRoutes);
router.use('/notes', notesRoutes);
router.use('/users', usersRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/recipes', recipesRoutes);

module.exports = router;
