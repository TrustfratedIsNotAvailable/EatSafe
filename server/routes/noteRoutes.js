//routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const noteCtrl = require("../controllers/noteController");

router.get("/", noteCtrl.getNotes);
router.post("/", noteCtrl.addNote);
router.put("/:id", noteCtrl.updateNote);
router.delete("/:id", noteCtrl.deleteNote);
router.put("/like/:id", noteCtrl.toggleLike);

module.exports = router;
