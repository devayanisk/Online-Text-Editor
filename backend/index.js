const User = require('./models/user');
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const connectToMongo = require('./db');

connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require("./routes/auth"));
app.use('/api/document', require("./routes/notes"));
app.use('/api/share', require("./routes/share"));


const server = app.listen(
    6001,
    console.log('Server running on PORT: 6001 \nhttp://localhost:6001')
);
  

