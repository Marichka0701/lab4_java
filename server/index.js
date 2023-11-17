require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");

const connection = require("./db");
const pizzaRoutes = require("./routes/pizza");
const authRoutes = require("./routes/auth");

const { isAuthenticated } = require("./middleware/auth");

// database connection
connection();

app.use(morgan("dev"));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/pizza", isAuthenticated, pizzaRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));