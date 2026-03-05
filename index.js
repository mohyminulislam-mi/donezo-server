// Import dependencies
const express = require("express");
const cors = require("cors");

// Create app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Hello Server! ✅");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running : ${port}`);
});
