require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extends: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
const http = require("http");

const server = http.createServer(app);
const connectDb = require("./db");
connectDb();


const userRoute = require("./routes/user.route");
const verify = require("./routes/verifyUser.route");

app.use("/", userRoute);
app.use("/auth", verify);


server.listen(process.env.PORT, () => {
    console.log("server is listening..");
});