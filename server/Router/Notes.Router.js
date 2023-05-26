const express = require('express');
const NotesRouter = express.Router();

const {getAllNotes,addNote,deleteNote,getNoteByID,updateData} =require("../controller/notes.controller")

NotesRouter.get("/",async(req,res,next)=>{


    try {
        let user=req.user;
        let search=req.query.s;
        
        console.log("auth user",user);  
       

        const notes=await getAllNotes(user._id,search);

        res.send({
            user,
            data:notes,
        })

    } catch (error) {
        
        res.status(404).send("Bad Request");
    }
 


})

NotesRouter.get("/:id",async(req,res,next)=>{


    try {
        let user=req.user;
        console.log("auth user",user);  
       

        const notes=await getNoteByID(req.params.id);

        res.send({
            user,
            data:notes,
        })

    } catch (error) {
        
        res.status(404).send("Bad Request");
    }
 


})

NotesRouter.post("/",async(req,res,next)=>{
    try {
        let user=req.user;
        console.log(user);  

        let{title,description}=req.body;
        if(title==="" || description===""){

            res.status(404).send("All Field Required");

        }
       let note= await addNote(user._id,title,description);
       res.send(note);
        
    } catch (error) {
        
        res.status(404).send("Bad Request");
    }
    
  
  })
  NotesRouter.patch("/:id",async(req,res,next)=>{
    
    try {
       
        let id=req.params.id;
        let{title,description}=req.body;
        let user=req.user;
        let note=await updateData(id,title,description);
        res.send({
            user,
            data:note,
        });
        console.log(user);  

    } catch (error) {
        
        res.status(404).send("Bad Request");
    }
    
  
  })

  NotesRouter.delete("/:id",async(req,res,next)=>{
    try {
        console.log(req.params.id);
        let user=req.user;
        console.log(user);  
        let notes=await deleteNote(req.params.id);
        res.send({
            data:notes
        })

    } catch (error) {
        
        res.status(404).send("Bad Request");
    }
  
  })
module.exports=NotesRouter;