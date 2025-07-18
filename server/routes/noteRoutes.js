//routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const noteCtrl = require("../controllers/noteController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, noteCtrl.getNotes);
router.post("/", verifyToken, noteCtrl.addNote);
router.put("/:id", verifyToken, noteCtrl.updateNote);
router.delete("/:id", verifyToken, noteCtrl.deleteNote);
router.put("/like/:id", verifyToken, noteCtrl.toggleLike);

module.exports = router;
