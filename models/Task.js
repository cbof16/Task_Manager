const mongoose = require('mongoose');


//to have a set structure for the document
const TaskSchema = new mongoose.Schema({
    //validation of the data being posted to the database
    name:{
    type:String,
    required:[true,'must provide the name'],
    trim:true,
    maxlength:[20,'name cannot be more than 20 characters'],
    },
    completed:{
        type:Boolean,
        default:false //set by default false as the task isn't completed
    },
})

module.exports=mongoose.model('Task',TaskSchema)
