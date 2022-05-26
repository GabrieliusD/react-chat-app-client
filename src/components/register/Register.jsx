import React from "react";

export default function Register() {
  return (
    <div>
      <h3>Create an account</h3>
      <input type="text" placeholder="Username?" />
      <input type="text" placeholder="Email?" />
      <input type="text" placeholder="Password..." />
      <input type="text" placeholder="Repeat Password..." />

      <button>Register</button>
      <a href="/login">Have an account? Login Here!!!</a>
    </div>
  );
}
