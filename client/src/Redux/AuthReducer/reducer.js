let initialData = {
   
    users: [],
}
const authReducer = (state = initialData, action) => {

    let{type,payload}=action;

    switch(type){
  
         case "ADD":{

            return{
                ...state,
                users:payload
            }
         }
         case "DELETE":{

               return{
           
                   ...state,
                   users:[],
               }
         }

         default:{
            return state;

         }

    }

}
 export default authReducer;