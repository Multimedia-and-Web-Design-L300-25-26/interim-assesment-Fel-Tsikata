const express = require("express");
const {
	registerUserHandler,
	loginUserHandler,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);
router.get("/", (req, res) => {
  res.send("auth route working");
});
module.exports = router;
