const express = require("express");

const {
	getAllCryptosHandler,
	getTopGainersHandler,
	getNewListingsHandler,
	createCryptoHandler,
} = require("../controllers/crypto.controller");

const router = express.Router();

router.get("/", getAllCryptosHandler);
router.get("/gainers", getTopGainersHandler);
router.get("/new", getNewListingsHandler);
router.post("/", createCryptoHandler);

module.exports = router;
