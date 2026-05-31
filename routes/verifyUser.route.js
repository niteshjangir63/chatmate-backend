const express = require("express");
const router = express.Router();
const { verify } = require("../controller/verifyUser.controller");
const { verifyToken } = require("../middleware/verifyToken");
router.get("/verify", verifyToken, verify);

module.exports = router;

