import React from "react";
import "./login.css";
export default function Login() {
  return (
    <div className="loginWrapper">
      <div className="loginTop">
        <h3>Login to Chat with me boy</h3>
      </div>
      <div className="loginMid">
        <input type="text" placeholder="Email?" />
        <input type="text" placeholder="Secret Word..." />
        <div className="inputWrapper">
          <button>Login</button>
        </div>
      </div>
      <a href="/register">No Account? No problem register here</a>
    </div>
  );
}
