import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import getRelativeTime from "../../utils/TimeStamp"

const SingleNotes = () => {
  const {id } = useParams();
  const baseurl = process.env.REACT_APP_BASE_URL;
  let nav=useNavigate();

  const[note,setNote]=useState({})
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

  return (
    <div>
        <div>
          <h1> <span>Title:</span> {note.title}</h1>
          <h5><span>Created At : </span>{convertToIST(note.createdAt) }</h5>
          <h5><span>updated At : </span>{convertToIST(note.updatedAt)  }</h5>
          <h6>Note Created At : {getRelativeTime(note.createdAt)}</h6>
          <h6>Note Updated At : {getRelativeTime(note.updatedAt)}</h6>

        </div>
        <div>
          <p><span>Description: </span>{note.description}</p>
        </div>
    </div>
  )
}

export default SingleNotes