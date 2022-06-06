import React, { useState } from "react";
import "./login.css";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    console.log("login thing");
    const test = await fetch("http://localhost:8080/login/password", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    console.log(test.body);
  };

  return (
    <div className="loginWrapper">
      <div className="loginTop">
        <h3>Login to Chat with me boy</h3>
      </div>
      <div className="loginMid">
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Email?"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          placeholder="Secret Word..."
        />
        <div className="inputWrapper">
          <button onClick={handleClick}>Login</button>
        </div>
      </div>
      <a href="/register">No Account? No problem register here</a>
    </div>
  );
}
