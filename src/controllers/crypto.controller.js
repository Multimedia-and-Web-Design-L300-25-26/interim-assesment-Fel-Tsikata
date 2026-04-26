const {
	getAllCryptos,
	getTopGainers,
	getNewListings,
	createCrypto,
} = require("../services/crypto.service");

const getAllCryptosHandler = async (req, res) => {
	try {
		const cryptos = await getAllCryptos();
		res.status(200).json({
			success: true,
			data: cryptos,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	}
};

const getTopGainersHandler = async (req, res) => {
	try {
		const cryptos = await getTopGainers(req.query.limit);
		res.status(200).json({
			success: true,
			data: cryptos,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	}
};

const getNewListingsHandler = async (req, res) => {
	try {
		const cryptos = await getNewListings(req.query.limit);
		res.status(200).json({
			success: true,
			data: cryptos,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	}
};

const createCryptoHandler = async (req, res) => {
	try {
		const { crypto, originalPrice, adjustedPrice } = await createCrypto(req.body);

		
		res.status(201).json({
			success: true,
			message: "Crypto created successfully",
			data: {
				...crypto.toObject(),
				originalPrice,
				adjustedPrice,
			},
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	}
};

module.exports = {
	getAllCryptosHandler,
	getTopGainersHandler,
	getNewListingsHandler,
	createCryptoHandler,
};

