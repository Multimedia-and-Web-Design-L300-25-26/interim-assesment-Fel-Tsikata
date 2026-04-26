const mongoose = require("mongoose");

const cryPtoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true,   
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    change24h: {
        type: Number,
        required: true,
    },
},{timestamps: true});


const Crypto = mongoose.model("Crypto", cryPtoSchema);

module.exports = Crypto;