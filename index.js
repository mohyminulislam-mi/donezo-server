// Import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Create app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
    await client.connect();
    const database = client.db("donezo");
    const usersCollections = database.collection("users");
    const analyticsCollections = database.collection("analytics");
    const productsCollections = database.collection("products");
    const overviewCollections = database.collection("overview");

    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollections.find().toArray();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    app.get("/analytics", async (req, res) => {
      try {
        const analytics = await analyticsCollections.find().toArray();
        res.status(200).json(analytics);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    app.get("/products", async (req, res) => {
      try {
        const products = await productsCollections.find().toArray();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    app.get("/overview", async (req, res) => {
      try {
        const overview = await overviewCollections.find().toArray();
        res.status(200).json(overview);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
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
