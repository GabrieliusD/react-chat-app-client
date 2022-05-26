import React from "react";

export default function Login() {
  return (
    <div>
      <h3>Login to Chat app boy</h3>
      <input type="text" placeholder="Email?" />
      <input type="text" placeholder="Secret Word..." />
      <button>Login</button>
      <a href="/register">No Account? No problem register here</a>
    </div>
  );
}
