import React, { useContext, useEffect } from "react";
import SearchBar from "../searchbar/Searchbar";
import { AuthContext } from "../../context/AuthContext";

import "./topbar.css";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="leftTopbar">
        <SearchBar></SearchBar>
      </div>
      <div className="centerTopbar">
        <h1 className="test">Chat With Me</h1>
      </div>

      <div className="rightTopbar">
        <img
          className="profileImg"
          src={`http://localhost:8080/images/${user.profileImage}`}
          alt=""
        />
        <h3 className="profileText">{user.username}</h3>
      </div>
    </div>
  );
}
