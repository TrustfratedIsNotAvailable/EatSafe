//routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.get("/", userCtrl.getAllUsers);
router.post("/", userCtrl.addUser);
router.put("/:uid", userCtrl.upsertUser);
router.get("/:uid", userCtrl.getUserByUid);

module.exports = router;
