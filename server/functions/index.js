const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// body parser for json data
app.use(express.json());

// cross oragin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

// firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// api endpoints
app.get("/", (req, res) => {
    return res.send("Hello world");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products", productRoute);

exports.app= functions.https.onRequest(app);