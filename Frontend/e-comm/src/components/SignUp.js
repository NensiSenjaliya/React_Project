import { useNavigate } from "react-router-dom";
import React  from "react";
import { useEffect, useState } from "react";

const API_URL="http://localhost:5000/api/user"
const SignUp=()=>{
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const navigate=useNavigate();
    
        useEffect(()=>{
            const auth=localStorage.getItem('User');
            if(auth)
            {
                navigate('/')
            }
        })

    const signupbtn= async ()=>{
        console.warn(name,email,password);
        let result=fetch(`${API_URL}/regi`,{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        })
        result=await (await result).json();
        console.warn( result);
        localStorage.setItem("User",JSON.stringify(result));
        navigate('/')
    }
    return(
        <>
        <div className="box">
            <h1 className="Rtext">Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Enter Name"/>
            <input className="inputBox" type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter Email"/>
            <input className="inputBox" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Password"/>
            <button className="signupbtn" onClick={signupbtn} type="button">Sing Up</button>
        </div>
        </>
    )
}
export default SignUp;