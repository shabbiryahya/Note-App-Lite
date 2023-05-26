const Note=require("../model/notes.model");

const getAllNotes=async(id,search=null)=>{
// console.log(search);
if(search){

    let notes=await Note.find({author:id, $text: { $search: search }}).sort({updatedAt:-1})

    return notes;
}
    let notes=await Note.find({author:id}).sort({updatedAt:-1})

    return notes;
}

const getNoteByID=async(_id)=>{

    let note=await Note.findById(_id);
    return note;

}

const addNote=async(id,title,description)=>{

   
   const note= await Note.create({title,description,author:id})

   return note;
}

const deleteNote=async(_id)=>{
console.log(_id);
    await Note.deleteOne({_id})
    let notes=await Note.find({})

    return notes;

}

const updateData=async(_id,title,description)=>{

  await Note.updateOne({_id},{$set:{title,description}});
  let note=await Note.findById(_id);
  return note;


}
module.exports={

    getAllNotes,
    getNoteByID,
    addNote,
    deleteNote,
    updateData
}