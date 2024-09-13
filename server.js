const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // To use environment variables from a .env file

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas using environment variables
const uri = process.env.MONGODB_URI || "your-default-mongodb-uri-here";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a schema and model for the Sample collection
const formDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }, // Changed from Number to String
    location: { type: String, required: true },
    query: { type: String, required: true },
  },
  { collection: "Sample" }
); // Specify the collection name

const FormData = mongoose.model("FormData", formDataSchema, "Sample");

// Routes
app.post("/submit", async (req, res) => {
  const { name, email, phone, location, query } = req.body;

  // Optional: Add more validation or sanitation here if needed

  const newFormData = new FormData({ name, email, phone, location, query });

  try {
    await newFormData.save();
    res.status(200).send("Data saved successfully");
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(400).send("Error saving data");
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
