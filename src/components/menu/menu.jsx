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

  //state for opening and closing models
  const [showImageModal, setShowImageModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);

  //state for updating users first name and last name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //state for bio
  const [bio, setBio] = useState("");

  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const onImageChanged = (e) => {
    setFile(e.target.files[0]);

    const fileURL = URL.createObjectURL(e.target.files[0]);
    setImage(fileURL);
  };
  const uploadFile = async () => {
    let data = new FormData();
    data.append("file", file);

    fetch(`http://localhost:8080/upload/`, {
      credentials: "include",
      mode: "cors",
      method: "POST",
      body: data,
    }).then((data) => {
      console.log(data.status);
      data.json().then((jsondata) => {
        console.log(jsondata.image);
        dispatch({ type: "UPLOAD_IMAGE", payload: jsondata.image });
      });
    });
  };
  const changeUsername = async () => {
    if (lastName.length === 0 && firstName === 0) return;
    const data = { firstName, lastName };
    fetch(`http://localhost:8080/users/profile/name`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
    }).then((data) => {
      console.log(data.body);

      data.json().then((jsondata) => {
        console.log(jsondata);
        //dispatch({ type: "UPLOAD_IMAGE", payload: jsondata.image });
      });
    });
  };

  const updateBio = async () => {
    if (bio.length === 0) return;
    const data = { firstName, lastName };
    fetch(`http://localhost:8080/users/profile/bio`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
    }).then((data) => {
      console.log(data.body);

      data.json().then((jsondata) => {
        console.log(jsondata);
        //dispatch({ type: "UPLOAD_IMAGE", payload: jsondata.image });
      });
    });
  };

  return (
    <div className="setting-container">
      <div className="setting-wrapper">
        <h2>Profile image</h2>
        <img
          className="settings-profile-img"
          src={`http://localhost:8080/images/${user.profileImage}`}
        ></img>

        {showImageModal ? (
          <Modal
            zIndex={20}
            showModal={showImageModal}
            setShowModal={setShowImageModal}
          >
            <img className="settings-profile-img" src={image}></img>
            <input type="file" onChange={(e) => onImageChanged(e)}></input>
            <button onClick={uploadFile}>Upload</button>
          </Modal>
        ) : null}
        <button onClick={() => setShowImageModal((prev) => !prev)}>Edit</button>
      </div>
      <div className="setting-wrapper">
        <h2>Name:</h2>
        <h2>Gabrielius Dobrovolskis</h2>
        {showNameModal ? (
          <Modal
            zIndex={20}
            showModal={showNameModal}
            setShowModal={setShowNameModal}
          >
            <p>Edit your name here</p>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <button onClick={changeUsername}>Submit</button>
          </Modal>
        ) : null}
        <button onClick={() => setShowNameModal((prev) => !prev)}>Edit</button>
      </div>
      <div className="setting-wrapper">
        <h2>Bio:</h2>
        <p>A person that likes to have fun</p>
        {showBioModal ? (
          <Modal
            zIndex={20}
            showModal={showBioModal}
            setShowModal={setShowBioModal}
          >
            <lable>Edit your bio. Write something about yourself</lable>
            <textarea
              className="bio-text"
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <button onClick={updateBio}>Submit</button>
          </Modal>
        ) : null}
        <button onClick={() => setShowBioModal((prev) => !prev)}>Edit</button>
      </div>
      <div className="setting-wrapper">
        <h2>Hobbies:</h2>
        <h2>Gaming Football</h2>
        {showHobbiesModal ? (
          <Modal
            zIndex={20}
            showModal={showHobbiesModal}
            setShowModal={setShowHobbiesModal}
          >
            <lable>Edit your bio. Write something about yourself</lable>
            <textarea className="bio-text"></textarea>
            <button>Submit</button>
          </Modal>
        ) : null}
        <button onClick={() => setShowHobbiesModal((prev) => !prev)}>
          Edit
        </button>
      </div>
      <div className="setting-wrapper">
        <h2>Work:</h2>
        <h2>Programmer</h2>
        {showWorkModal ? (
          <Modal
            zIndex={20}
            showModal={showWorkModal}
            setShowModal={setShowWorkModal}
          >
            <lable>Edit your bio. Write something about yourself</lable>
            <textarea className="bio-text"></textarea>
            <button>Submit</button>
          </Modal>
        ) : null}
        <button onClick={() => setShowWorkModal((prev) => !prev)}>Edit</button>
      </div>
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
