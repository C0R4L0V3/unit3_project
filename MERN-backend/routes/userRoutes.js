const express = require("express");
const {
  addUserContent,
  getUserContent,
  updateUserContent,
  deleteUserContent,
} = require("../controllers/contentController.js");

const router = express.Router();
//defining routes
router.post("/:userId/content", addUserContent);
router.get("/:userId/content", getUserContent);
router.put("/:userId/content/:contentId", updateUserContent);
router.delete("/:userId/content/:contentId", deleteUserContent);

module.exports = router;
