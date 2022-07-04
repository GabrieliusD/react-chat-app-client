import React from "react";
import { useState } from "react";
import "./menu.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { default as Modal } from "../modal/Modal";
export default function Menu() {
  const { dispatch } = useContext(AuthContext);
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
        console.log(jsondata.image);
        dispatch({ type: "UPLOAD_IMAGE", payload: jsondata.image });
      })
    );
  };
  return (
    <div>
      <DropdownMenu></DropdownMenu>

      <h2>Profile</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

export function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <img
        src={props.icon}
        className="icon-button"
        onClick={() => setOpen(!open)}
      ></img>
      {open && props.children}
    </li>
  );
}

export function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");

  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">{props.children}</div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem leftIcon="Hi" goToMenu="main">
            This is Different
          </DropdownItem>
          <DropdownItem>Go Back</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export function DropdownItem(props) {
  return (
    <a
      href="#"
      className="menu-item"
      onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}
    >
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      {props.rightIcon ? (
        <span className="icon-button">{props.rightIcon}</span>
      ) : (
        ""
      )}
    </a>
  );
}

export function DropdownButton(props) {
  const buttonClicked = () => {
    console.log("Drop down button clicked");
    props.setShowModal((prev) => !prev);
  };
  return <a href="#" className="menu-item" onClick={buttonClicked}></a>;
}
