const mongoose = require("mongoose");
require("dotenv").config();

CONNECTION_URL = `mongodb://localhost:27017/textEditor`
// console.log("COnnection url value : ",CONNECTION_URL);
const connectToMongo = async () => {
    mongoose.connect(CONNECTION_URL, await console.log("Connected to mongo Successful!!!")
       );
   }

module.exports = connectToMongo;