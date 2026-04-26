const express = require("express"); 
const { getUserProfileHandler } = require("../controllers/user.controller");  

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", protect, getUserProfileHandler);

module.exports = router;
