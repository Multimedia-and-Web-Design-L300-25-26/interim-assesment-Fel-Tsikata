const express = require("express");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const cryptoRoutes = require("./routes/crypto.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).json({ message: "API is running" });
});

app.use("/crypto", cryptoRoutes);
app.use("/auth", authRoutes);
app.use("/", userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
