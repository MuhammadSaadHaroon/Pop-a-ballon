import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export function Signup({ navigate }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        firstName,
        lastName,
        email,
        lastPlayed: null,
      });
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Try login instead.");
      } else {
        setError(err.message);
      }
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
      <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Create Account</button>

      {/* Login link */}
      <p style={{ marginTop: 12 }}>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
