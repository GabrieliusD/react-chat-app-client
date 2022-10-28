import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../formInput/FormInput";
import "./register.css";
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "",
      label: "First Name",
      errorMessage: "Required",
      required: true,
      pattern: "^[A-Za-z]{3,16}$",
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "",
      label: "Last Name",
      errorMessage: "Required",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "",
      label: "Username",
      errorMessage: "Required",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "",
      label: "Email",
      errorMessage: "Required",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "",
      label: "Password",
      errorMessage: "Required",
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "",
      label: "Confirm Password",
      errorMessage: "Required",
      required: true,
      pattern: values.password,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
    const test = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(values),
    });
    if (test.status === 200) {
      navigate("/login");
    }
    const jsondata = await test.json();
    if (!jsondata.id) return;
    console.log(jsondata);
  };
  return (
    <div className="registerWrapper">
      <div className="registerTop">
        <h3>Create an account</h3>
      </div>
      <form className="registerForm" onSubmit={handleClick}>
        <div className="registerMid">
          {/* <div className="name-container">
            <input type="text" placeholder="First Name"></input>
            <input type="text" placeholder="Last Name"></input>
          </div>
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
          /> */}
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            ></FormInput>
          ))}
          <div className="buttonWrapper">
            <button>Register</button>
          </div>
          <a href="/chatapp/login">Have an account? Login Here!!!</a>
        </div>
      </form>
    </div>
  );
}
