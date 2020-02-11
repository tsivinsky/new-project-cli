// Require dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/index"));

// Listen to the server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
