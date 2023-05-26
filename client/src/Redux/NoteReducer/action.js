import {getData,postData,deleteData} from "../../FetchData/fetchData"

const getAllNotesActionCreator=()=>{

return (dispatch,getState)=>{

    console.log(getState());

      getData(dispatch)

}
    
}

const addNoteActionCreator=(payload)=>{

   return (dispatch,getState)=>{

     
    
   }

}

const deleteNoteActionCreator=()=>{


}

const updateNoteActionCreator=()=>{


}


export{

getAllNotesActionCreator,
addNoteActionCreator,
deleteNoteActionCreator,
updateNoteActionCreator

}