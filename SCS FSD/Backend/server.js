require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ROOT ROUTE
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Complaint System API is running"
    });
});

// HEALTH ROUTE
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy"
    });
});

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// COMPLAINT ROUTES
app.use("/api/complaints", complaintRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});