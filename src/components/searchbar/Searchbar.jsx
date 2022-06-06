import React, { useState } from "react";
import "./searchbar.css";
export default function SearchBar({ placeholder }) {
  const [data, setData] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputChange = async (value) => {
    setCurrentInput(value);
    const users = await fetch(`http://localhost:8080/users/${value}`);
    const jsondata = await users.json();
    setData(jsondata);
    console.log(jsondata);
  };

  const selectUser = (value) => {
    inputChange(value.username);
    setCurrentInput(value.username);
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
