let initialData = {
   
    notes: [],
}

const noteReducer=(state = initialData, action)=>{
let{type,payload}=action;

  switch(type){
    case "GET":{

        return{
            ...state,
            notes:payload,
        }
    }
    case "ADD":{

            return {
                ...state,
                notes:[...state.notes,payload]
                
            }
    }
    case "DELETE":{
        return {
            ...state,
            notes:state.notes.filter((note)=>note._id!==payload)
        }
    }
    case "UPDATE":{
        return{
            ...state,
            notes:payload,
        }
    }
    default:{

        return state;
    }
  }

}

export default noteReducer;