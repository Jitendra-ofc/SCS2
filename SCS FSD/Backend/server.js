const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// CORS - MUST BE BEFORE ROUTES
app.use(cors({
  origin: "https://scs-2-kappa.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Complaint System API is running"
  });
});

// Health route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy"
  });
});

// Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});