import React from "react";
import "./register.css";
export default function Register() {
  return (
    <div className="registerWrapper">
      <div className="registerTop">
        <h3>Create an account</h3>
      </div>
      <div className="registerMid">
        <input type="text" placeholder="Username?" />
        <input type="text" placeholder="Email?" />
        <input type="text" placeholder="Password..." />
        <input type="text" placeholder="Repeat Password..." />
        <div className="buttonWrapper">
          <button>Register</button>
        </div>
      </div>
      <a href="/login">Have an account? Login Here!!!</a>
    </div>
  );
}
