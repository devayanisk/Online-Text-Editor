const User = require('./models/user');
const Document = require('./models/document');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

 
mongoose.connect('mongodb+srv://devayanisk:texteditor@cluster0.vhrsll8.mongodb.net/test');

db=mongoose.connection
db.on('error',(error)=>(console.log(error)))
db.once('open',()=>(console.log("Succesful")))

const app = express();

app.use(express.json());
app.use('/api', routes);


const io = require("socket.io")(3001, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET","POST"]
    }
});

io.on('connection', (socket) => {

    socket.on("document-change", (delta) => {
        console.log(delta);
        socket.broadcast.emit("document-update",delta);
    })
});

const server = app.listen(
    5000,
    console.log('Server running on PORT')
);
  

