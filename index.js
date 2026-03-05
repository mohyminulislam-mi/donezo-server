// Import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@mohyminulislam.uwhwdlk.mongodb.net/?appName=Mohyminulislam`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("donezo");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Default route
app.get("/", (req, res) => {
  res.send("Hello Server! ✅");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running : ${port}`);
});
