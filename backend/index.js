require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

// routes
app.get("/", (req, res) => {
  res.send("Hello from the Backend! 🤩");
});
