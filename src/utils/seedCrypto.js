const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Crypto = require("../models/Crypto");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const cryptoData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67000,
    image: "https://cryptoicons.org/api/icon/btc/200",
    change24h: 2.5,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3200,
    image: "https://cryptoicons.org/api/icon/eth/200",
    change24h: 1.8,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 150,
    image: "https://cryptoicons.org/api/icon/sol/200",
    change24h: 5.2,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.15,
    image: "https://cryptoicons.org/api/icon/doge/200",
    change24h: -1.2,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Crypto.deleteMany(); // optional (clears old data)
    await Crypto.insertMany(cryptoData);
    console.log("Crypto data inserted!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(error);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedData();