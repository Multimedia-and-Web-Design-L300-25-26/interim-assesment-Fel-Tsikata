const path = require("path");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");
const app = require("./src/app");
console.log("Starting server..., loaded routes");

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

startServer().catch((error) => {
	console.error("Failed to start server:", error);
	process.exit(1);
});
