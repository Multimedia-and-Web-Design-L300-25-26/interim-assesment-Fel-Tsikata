const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const cryptoRoutes = require("./routes/crypto.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();


const allowedOrigins = [
  "http://localhost:5173", // for local development (Vite)
  "https://felicitytsikata-crypto-app.netlify.app", // your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

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