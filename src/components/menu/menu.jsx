import React from "react";
import { useState } from "react";
import "./menu.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { CSSTransition } from "react-transition-group";
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
      <Navbar>
        <NavItem icon=":)"></NavItem>
        <NavItem icon=":)"></NavItem>
        <NavItem icon=":)">
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <h2>Profile</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-button">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem leftIcon="Hi">My Profile</DropdownItem>
          <DropdownItem goToMenu="settings">Settings</DropdownItem>
        </div>
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
          <DropdownItem>Go BAck</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
