//routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const verifyToken=require("../middlewares/verifyToken")

router.get("/",verifyToken, userCtrl.getAllUsers);
router.post("/", userCtrl.addUser);
router.put("/:uid",verifyToken, userCtrl.upsertUser);
router.get("/:uid", userCtrl.getUserByUid);

module.exports = router;
