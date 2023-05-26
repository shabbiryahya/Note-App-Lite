import React, { useEffect, useState } from 'react'
import Styles from "./EditNote.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import getRelativeTime from "../../utils/TimeStamp"
import moment from 'moment-timezone';


const EditNote = () => {
  const {id } = useParams();
  const baseurl = process.env.REACT_APP_BASE_URL;
  const[note,setNote]=useState({
    _id:"",
    title:"",
    description:"",
    author:"",
    createdAt:"",
    updatedAt:"",
  })

  let nav=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem("note_auth_token");
    
    fetch(`${baseurl}/note/${id}`,{

      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{

            return res.json();
    }).then((data)=>{

        console.log(data);
        console.log(data.data);
        console.log(data.user);



        setNote(data.data)

        
    })
    
    .catch((error)=>{
 
      nav("/")
      alert("No Note Found");
      
      console.log(error.message);
    })


  },[])

  const convertToIST = (inputDate) => {
    const inputMoment = moment(inputDate);
    const convertedMoment = inputMoment.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    return convertedMoment;
  }

  const onChangeNote=(e)=>{
   
    let{name,value}=e.target;
    setNote({...note,[name]:value})

  }

  const onSubmitNote=(e)=>{
 
    console.log(note);
    e.preventDefault();
    const token=localStorage.getItem("note_auth_token");
    
    fetch(`${baseurl}/note/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(note)
        })
        .then((res)=>{
          console.log(res);
          
          
            alert("Note Updated Successfully");
            nav(`/notes/${note._id}`)
           })
              .catch((error)=>{
                console.log(error.message);
                alert("Error Updating Note");
    })

  }


  return (
      <div>
        <div>
          {/* <h1> <span>Title:</span> {note.title}</h1> */}
          <h5><span>Created At : </span>{convertToIST(note.createdAt) }</h5>
          <h5><span>updated At : </span>{convertToIST(note.updatedAt)  }</h5>
          <h6>{getRelativeTime(note.createdAt)}</h6>
        </div>
        <div>
          {/* <p><span>Description: </span>{note.description}</p> */}
          <form  style={{display:"grid"}} onSubmit={onSubmitNote}>
            <input type="text" name='title' placeholder=''  value={note.title} onChange={onChangeNote}/> &nbsp;
            <textarea type="text" name='description' placeholder=''  value={note.description} onChange={onChangeNote}/> &nbsp;
            <input type="submit" value="Update" />

          </form>
        </div>
    </div>
  )
}

export default EditNote