const User = require('./models/user');
const Document = require('./models/document');
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const connectToMongo = require('./db');

 
// mongoose.connect('mongodb+srv://devayanisk:texteditor@cluster0.vhrsll8.mongodb.net/test');

// db=mongoose.connection
// db.on('error',(error)=>(console.log(error)))
// db.once('open',()=>(console.log("Succesful")))

connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require("./routes/auth"));
app.use('/api/document', require("./routes/notes"));




// const io = require("socket.io")(3001, {
//     cors: {
//         origin:"http://localhost:3000",
//         methods: ["GET","POST"]
//     }
// });

// io.on('connection', (socket) => {

//     socket.on("document-change", (delta) => {
//         console.log(delta);
//         socket.broadcast.emit("document-update",delta);
//     })
// });

const server = app.listen(
    6001,
    console.log('Server running on PORT: 6001 \nhttp://localhost:6001')
);
  

