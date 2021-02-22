//Dependencies
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Server port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));

// Mongoose connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/witb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Test route
  app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// Route to build folder
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });

// Listen to port
  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});