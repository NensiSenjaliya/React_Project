import React, { useEffect } from "react";
//import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL="http://localhost:5000/api/user"
const Login = () => {
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('User');
        if (auth) {
            navigate('/')
        }
    })


    const loginhandle = async () => {
        let result = await fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        result = await result.json();
        console.warn(result);

        if (result.user) {
            localStorage.setItem("User", JSON.stringify(result.user));
            // localStorage.setItem("User", JSON.stringify(result.user));
            localStorage.setItem("userId", result.user._id);
            localStorage.setItem("name", result.user.name);

            if (result.user.role === 'admin') {
                navigate('/admin-panel');
            } else {
                navigate('/user-panel');
            }
        } else {
            alert("Please enter correct details");
        }
    };


    return (
        <>
            <div className="login">


                <h1 className="Rtext">Login</h1>
                <input className="inputBox" type="text" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter Email" />
                <input className="inputBox" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter Password" />
                <button className="loginbtn" onClick={loginhandle} type="button">Login</button>
            </div>

        </>
    )
}

export default Login;