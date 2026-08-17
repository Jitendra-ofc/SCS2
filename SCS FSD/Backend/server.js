const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "https://scs-2-kappa.vercel.app",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Complaint System API is running"
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy"
  });
});

/*
  KEEP YOUR EXISTING ROUTES HERE

  Example:
  const authRoutes = require("./routes/authRoutes");
  const complaintRoutes = require("./routes/complaintRoutes");

  app.use("/api/auth", authRoutes);
  app.use("/api/complaints", complaintRoutes);
*/

// 404 handler
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