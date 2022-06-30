import React from "react";
import { useState } from "react";
import "./menu.css";
export default function Menu() {
  const [file, setFile] = useState(null);
  const uploadFile = async () => {
    let data = new FormData();
    data.append("file", file);

    fetch(`http://localhost:8080/upload/`, {
      credentials: "include",
      mode: "cors",
      method: "POST",
      body: data,
    }).then((data) =>
      data.json().then((jsondata) => {
        console.log(jsondata);
      })
    );
  };
  return (
    <div>
      <h2>Profile</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}
