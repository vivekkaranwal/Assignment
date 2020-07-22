import React, { useState, useEffect } from 'react';
import axios from 'axios'
function Use() {
   
   const [post, setPost]= useState('');
   const  [username, setUsername]  = useState('mojombo');
   const  [name, setname] = useState('');
   useEffect(()=>{
      axios(`https://api.github.com/users/${username}`)
      .then(res=>{
         console.log(res);
         setname(res.data.login);
      }).catch(err=>{
        console.log(err);
      })
   },[username])
   function updateUser(e){
      let user =  e.target.value;
      setPost(user);
   }
   function clicked(){
     setUsername(post);
   }
   function submitForm(e){
     e.preventDefault();

   }
  return (
    <div className="App">
     <h1> {name} </h1>

    <form onSubmit={submitForm} >
     <input placeholder="Enter the name of user" name="user" value ={post} onChange={updateUser} ></input>
     <button onClick={clicked} >Submit</button>
     </form>
    </div>
         

  );
}

export default Use;