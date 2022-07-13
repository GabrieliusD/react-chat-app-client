import React from "react";
import "./user.css";
export default function User({ userFound, clickHandle }) {
  return (
    <div className="user-container" onClick={clickHandle}>
      <img className="user-img" src="" alt="" />
      <span className="user-name">{userFound.username}</span>
      <span className="user-icon">--></span>
    </div>
  );
}
