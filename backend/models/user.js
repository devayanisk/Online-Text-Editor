// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     password: String,
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
  });

module.exports = mongoose.model("User", UserSchema);