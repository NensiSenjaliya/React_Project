// import React, { useEffect } from "react";
// //import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// const API_URL="http://localhost:5000/api/user"
// const Login = () => {
//     const [email, setemail] = React.useState('');
//     const [password, setpassword] = React.useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const auth = localStorage.getItem('User');
//         if (auth) {
//             navigate('/')
//         }
//     })


//     const loginhandle = async () => {
//         let result = await fetch(`${API_URL}/login`, {
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         });

//         result = await result.json();
//         console.warn(result);

//         if (result.user) {
//             localStorage.setItem("User", JSON.stringify(result.user));
//             // localStorage.setItem("User", JSON.stringify(result.user));
//             localStorage.setItem("userId", result.user._id);
//             localStorage.setItem("name", result.user.name);

//             if (result.user.role === 'admin') {
//                 navigate('/admin-panel');
//             } else {
//                 navigate('/user-panel');
//             }
//         } else {
//             alert("Please enter correct details");
//         }
//     };


//     return (
//         <>
//             <div className="login">


//                 <h1 className="Rtext">Login</h1>
//                 <input className="inputBox" type="text" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter Email" />
//                 <input className="inputBox" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter Password" />
//                 <button className="loginbtn" onClick={loginhandle} type="button">Login</button>
//             </div>

//         </>
//     )
// }

// export default Login;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:5000/api/user";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token"); // use unified token
        if (token) {
            navigate("/user-panel");
        }
    }, [navigate]);

    // Google Login handler
    const handleCallbackResponse = async (response) => {
        try {
            const userObject = jwtDecode(response.credential);

            // Send Google info to backend to create/find user & get JWT
            const res = await fetch(`${API_URL}/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    googleId: userObject.sub,
                    name: userObject.name,
                    email: userObject.email,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                // Save JWT token and user info
                localStorage.setItem("token", data.auth); // JWT from backend
                localStorage.setItem("User", JSON.stringify(data.user));
                localStorage.setItem("name", data.user.name);
                localStorage.setItem("email", data.user.email);

                // Redirect based on role
                if (data.user.role === "admin") {
                    navigate("/admin-panel");
                } else {
                    navigate("/user-panel");
                }
            } else {
                alert(data.message || "Google login failed");
            }
        } catch (err) {
            console.error("Google login error:", err);
        }
    };

    // Normal login handler
    const loginhandle = async () => {
        let result = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        result = await result.json();
        console.log(result);

        if (result.user) {
            localStorage.setItem("token", result.auth); // JWT from backend
            localStorage.setItem("User", JSON.stringify(result.user));
            localStorage.setItem("userId", result.user._id);
            localStorage.setItem("name", result.user.name);

            if (result.user.role === "admin") {
                navigate("/admin-panel");
            } else {
                navigate("/user-panel");
            }
        } else {
            alert("Please enter correct details");
        }
    };

    return (
        <div className="login">
            <h1 className="Rtext">Login</h1>

            {/* Normal login */}
            <input
                className="inputBox"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                className="inputBox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <a className="resetpsw">Forgot Password?</a>
            <button className="loginbtn" onClick={loginhandle} type="button">
                Login
            </button>

            <hr />

            {/* Google Login Button */}
            <GoogleLogin
                onSuccess={handleCallbackResponse}
                onError={() => {
                    console.log("Google Login Failed");
                }}
            />
        </div>
    );
};

export default Login;


