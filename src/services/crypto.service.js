const Crypto = require("../models/Crypto");

const createError = (message, statusCode) => {
	const error = new Error(message);
	error.statusCode = statusCode;
	return error;
};

const apply24hChangeToPrice = (price, change24h) => {
	const percentMultiplier = 1 + change24h / 100;
	return Number((price * percentMultiplier).toFixed(2));
};

const getAllCryptos = async () => {
	return Crypto.find({}).sort({ createdAt: -1 });
};

const getTopGainers = async (limit = 10) => {
	const parsedLimit = Number(limit);
	const safeLimit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 10 : parsedLimit;

	return Crypto.find({}).sort({ change24h: -1 }).limit(safeLimit);
};

const getNewListings = async (limit = 10) => {
	const parsedLimit = Number(limit);
	const safeLimit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 10 : parsedLimit;

	return Crypto.find({}).sort({ createdAt: -1 }).limit(safeLimit);
};

const createCrypto = async ({ name, symbol, price, image, change24h }) => {
	if (
		!name ||
		!symbol ||
		price === undefined ||
		image === undefined ||
		change24h === undefined
	) {
		throw createError("Name, symbol, price, image, and change24h are required", 400);
	}

	const parsedPrice = Number(price);
	const parsedChange24h = Number(change24h);

	if (Number.isNaN(parsedPrice) || Number.isNaN(parsedChange24h)) {
		throw createError("Price and change24h must be valid numbers", 400);
	}

	const adjustedPrice = apply24hChangeToPrice(parsedPrice, parsedChange24h);

	const existingCrypto = await Crypto.findOne({ symbol: symbol.trim().toUpperCase() });
	if (existingCrypto) {
		throw createError("Crypto with this symbol already exists", 409);
	}

	const crypto = await Crypto.create({
		name: name.trim(),
		symbol: symbol.trim().toUpperCase(),
		price: adjustedPrice,
		image: String(image).trim(),
		change24h: parsedChange24h,
	});

	return {
		crypto,
		originalPrice: parsedPrice,
		adjustedPrice,
	};
};

module.exports = {
	getAllCryptos,
	getTopGainers,
	getNewListings,
	createCrypto,
};
