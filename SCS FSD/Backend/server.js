const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ==========================================
// CONNECT TO MONGODB
// ==========================================
connectDB();

// ==========================================
// CORS CONFIGURATION
// ==========================================
const allowedOrigins = [
  "https://scs-2-kappa.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:5500"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without an Origin header, such as Postman
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

  credentials: true,

  optionsSuccessStatus: 200
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// ==========================================
// BODY MIDDLEWARE
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// ROOT ROUTE
// ==========================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Complaint System API is running"
  });
});

// ==========================================
// HEALTH CHECK
// ==========================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy"
  });
});

// ==========================================
// ROUTES
// ==========================================
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// ==========================================
// 404 ROUTE
// ==========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ==========================================
// SERVER
// ==========================================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});