const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Import Routes
const authRoute = require("./Routes/auth");

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB, { useNewUrlParser: true }, () =>
  console.log("Database Connected")
);

//Middleware
app.use(express.json());

//Route Middleware
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server Running"));
