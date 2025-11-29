import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";


export function Login({ navigate }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const dispatch = useDispatch();


const handleLogin = async () => {
try {
const res = await signInWithEmailAndPassword(auth, email, password);
dispatch(setUser(res.user));
navigate("/home");
} catch (err) {
console.log(err);
}
};


return (
<div className="auth-container">
<h2>Login</h2>
<input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
<button onClick={handleLogin}>Login</button>
</div>
);
}