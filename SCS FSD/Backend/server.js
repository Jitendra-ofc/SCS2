const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ================================
// CORS CONFIGURATION
// ================================
const corsOptions = {
  origin: [
    "https://scs-2-kappa.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:5500"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options(/.*/, cors(corsOptions));

// ================================
// MIDDLEWARE
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// ROOT ROUTE
// ================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Complaint System API is running"
  });
});

// ================================
// HEALTH CHECK
// ================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy"
  });
});

// ================================
// ROUTES
// ================================

const authRoutes = require("./routes/authRoutes");
// const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

// ================================
// 404 HANDLER
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ================================
// SERVER
// ================================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});