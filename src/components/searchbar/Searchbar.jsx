import React, { useState } from "react";
import "./searchbar.css";
export default function SearchBar({ placeholder }) {
  const [data, setData] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputChange = async (value) => {
    setCurrentInput(value);
    if (value === "") {
      setData([]);
      return;
    }
    const users = await fetch(`http://localhost:8080/users/${value}`);
    const jsondata = await users.json();
    setData(jsondata);
    console.log(jsondata);
  };

  const selectUser = (value) => {
    inputChange(value.username);
    setCurrentInput(value.username);
    createConvo(value.id);
  };

  const createConvo = (id) => {
    fetch("http://localhost:8080/convo/create", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user2: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => inputChange(e.target.value)}
        />
      </div>
      {data.length > 0 ? "" : ""}
      <div className="dataResult">
        {data.map((value, key) => {
          return (
            <div onClick={(e) => selectUser(value)} className="user">
              {value.username}
            </div>
          );
        })}
      </div>
    </div>
  );
}
