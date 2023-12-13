const express = require("express");
const cookieParser = require("cookie-parser");
const {connect} = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary")
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");

const app = express();

// loading environment variables
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 5000;

// middlewares

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true,    
}))

// connect with database
connect();

// connect with cloudinary
cloudinaryConnect();

// mounting routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", profileRoute);

// Test Route
app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running ...",
    });
});

// listen to server
app.listen(PORT, ()=> {
    console.log("server start at port",PORT);
});