const express = require('express');
const { mongoose } = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require('dotenv').config()

//routes imports
const userRoutes = require('./modules/user/user.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(cors());

// routes
app.use('/api', userRoutes);

app.get('/api', (req, res) => {
    res.json({ msg: "Welcome" })
})
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is running on port ", port);
})