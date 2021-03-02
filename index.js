const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Connect to DB
mongoose.connect( , {useNewUrlParser: true}, () => console.log("Database Connected"));

//Import Routes
const authRoute = require("./Routes/auth");

//Route Middleware
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server Running"));
