const baseurl = process.env.REACT_APP_BASE_URL;
const token=localStorage.getItem("note_auth_token");



const getData=(dispatch)=>{

    fetch(`${baseurl}/note`,{

        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
  
              return res.json();
      }).then((data)=>{
  
          console.log(data);
          console.log(data.data);
          console.log(data.user);
  
  
          dispatch({
            type:"GET",
            payload:data.data,
          })
  
        //   setNotes(data.data)
        //   setOriginalData(data.data);
  
        //   setName(data.user.name)
        //   setUser(data.user)
      })
      
      .catch((error)=>{
  
         console.log(error.message);
      })
}

const postData=(note)=>{

    fetch(`${baseurl}/note`,{
        method:"POST",
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          body:JSON.stringify(note)
          })
          .then((data)=>{
            console.log(data);
            return data.json();
            })
            .then((data)=>{
              console.log(data);
            //   setNotes([...notes,data])
            //   setOriginalData([...notes,data])
            //   setNote({
            //     title:"",
            //     description:""})

            alert("Note Created")
           
      }).catch((error)=>{
  
       console.log(error);
       alert(error.message);
      })

}

const deleteData=(id)=>{


    fetch(`${baseurl}/note/${id}`,{
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
          })
          .then((data)=>{
            console.log(data);
            return data.json();
            })
            .then((data)=>{
            
      
           
                alert("Note Deleted")
                }).catch((error)=>{
                  console.log(error);
                  alert(error.message);
                  })
                  
}

const debounceCallBack=(q)=>{

    fetch(`${baseurl}/note?s=${q}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(data.data);
          console.log(data.user);
  
            // setNotes(data.data)
            // setOriginalData(data.data)
  
            // setName(data.user.name)
            // setUser(data.user)
        })
        .catch((error) => {
          console.log(error.message);
        });
}


export {
    getData,
    postData,
    deleteData,
    debounceCallBack,

}