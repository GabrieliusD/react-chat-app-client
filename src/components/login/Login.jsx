import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = async () => {
    console.log("login thing");
    const test = await fetch(
      `${process.env.REACT_APP_API_URL}/login/password`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ username, password }),
      }
    );
    const jsondata = await test.json();
    if (!jsondata.id) return;
    console.log(AuthContext);
    dispatch({ type: "LOGIN_SUCCESS", payload: jsondata });
    console.log(jsondata);
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
          type="password"
          placeholder="Secret Word..."
        />
        <div className="inputWrapper">
          <button className="loginButton" onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
      <p>{process.env.REACT_APP_API_URL}</p>
      <a href="/register">No Account? No problem register here</a>
    </div>
  );
}
