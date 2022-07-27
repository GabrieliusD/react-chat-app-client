import React from "react";
import { useState } from "react";
import "./register.css";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const handleClick = async () => {
    const test = await fetch("https://gabkis.com/api/signup", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ username, email, password, repassword }),
    });
    const jsondata = await test.json();
    if (!jsondata.id) return;
    console.log(jsondata);
  };
  return (
    <div className="registerWrapper">
      <div className="registerTop">
        <h3>Create an account</h3>
      </div>
      <div className="registerMid">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username?"
        />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email?"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />
        <input
          type="password"
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Repeat Password..."
        />
        <div className="buttonWrapper">
          <button onClick={handleClick}>Register</button>
        </div>
      </div>
      <a href="/login">Have an account? Login Here!!!</a>
    </div>
  );
}
