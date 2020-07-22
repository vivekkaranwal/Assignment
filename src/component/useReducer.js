import React, {useReducer,useEffect } from 'react';
import axios from 'axios'
import { Button } from "antd";
import "antd/dist/antd.css";
  const intialstate = {
      username:'',
      finalSet:'mojombo',
      getName:'',
      image:'',
      public_gists:''
  }
  function reduce(state, action){
    return {
        ...state,
        [action.field]: action.value
    }
  }
function useReducerc() {
    const [state, dispatch] = useReducer(reduce, intialstate);

    function updateUsers(e){
      dispatch({ type:"username", field:'username', value:e.target.value})
    }
    function Clicked(){
        dispatch({ type:"finalSet", field:'finalSet', value: username.replace(" ","","g")})
    }
    const {username, finalSet, image, public_gists} = state;
    useEffect(()=>{
        axios(`https://api.github.com/users/${finalSet}`)
        .then(res=>{ 
            console.log(res.data.avatar_url);
           dispatch({ type:"getName", field:'getName', value:res.data.name})
           dispatch({ type:"public_gists", field:'public_gists', value:res.data.public_repos})
           dispatch({ type:"image", field:'image', value: res.data.avatar_url})
        }).catch(err=>{
          console.log(err);
          alert(" SORRY NO PROFILE FIND");
        })
     },[finalSet]) 
     function Submit(e){
        e.preventDefault();
     }
    return (
        <div>
         <h1 className="animated" >GitHub Profile Finder</h1>
        <div className="Apps">
            <form onSubmit = {Submit} >
            <input id="form-controls" placeholder="Enter the name of user" name="user" value ={state.username} onChange={updateUsers} ></input>
            <Button onClick = {Clicked}  type="danger" style={{ marginLeft: 8 }}> Submit </Button>
            </form>
            <div className="content text-uppercase">
            <p> Profile Name : {state.getName} </p>
            <p>Total repository : {state.public_gists} </p>
            <p>Profile Image</p>
            </div>
            <img className="img-fluid" src={state.image}></img>
        </div>
    </div>
    )
}

export default useReducerc
