const mongoose = require('mongoose');
const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
        description:{
            type:String,
            required:true,
        },author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    
},{
    timestamps:true,
    versionKey:false,
})


const Note=mongoose.model("Note",notesSchema,"notes");

module.exports=Note;