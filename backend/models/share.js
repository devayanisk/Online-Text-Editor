const mongoose = require('mongoose')
const { Schema } = mongoose;

const ShareSchema = new Schema({
    email:{
        type: String,
        ref: 'user'
    },
    docId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'note'
    }
  });

module.exports = mongoose.model("Share", ShareSchema);