const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Fixed typo
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");

// Load environment variables
dotenv.config();

// Connect to database
connectDb();

// Initialize express app
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/",require("./routes/userRoute"));
// app.use("/api/v1/users", require("./routes/userRoute")); // Fixed the route

app.use("/api/v1/transactions/",require("./routes/transRoute"));

// Port setup
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
