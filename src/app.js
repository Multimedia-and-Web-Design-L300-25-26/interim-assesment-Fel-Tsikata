const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const cryptoRoutes = require("./routes/crypto.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// ✅ CORS config
const allowedOrigins = [
  "http://localhost:5173",
  "https://felicitytsikata-crypto-app.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//Apply CORS
app.use(cors(corsOptions));

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