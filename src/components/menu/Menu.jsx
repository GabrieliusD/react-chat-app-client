import React, { useRef } from "react";
import { useState } from "react";
import "./menu.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { default as Modal } from "../modal/Modal";
import { useEffect } from "react";
export default function Menu() {
  const { dispatch } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({});

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

  //state for hobby

  const [hobby, setHobby] = useState("");

  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const onImageChanged = (e) => {
    setFile(e.target.files[0]);

    const fileURL = URL.createObjectURL(e.target.files[0]);
    setImage(fileURL);
  };

  const getUserData = () => {
    fetch(`https://gabkis.com/api/users/profile/${user.id}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.status === 200
        ? response.json().then((json) => {
            setUserData(json.data.userProfile);
            console.log(json.data.userProfile);
          })
        : response.json().then((data) => console.log(data));
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const uploadFile = async () => {
    let data = new FormData();
    data.append("file", file);

    fetch(`https://gabkis.com/api/upload/`, {
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
    fetch(`https://gabkis.com/api/users/profile/name`, {
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
        getUserData();
        //dispatch({ type: "UPLOAD_IMAGE", payload: jsondata.image });
      });
    });
  };

  const updateBio = async () => {
    if (bio.length === 0) return;
    const data = { bio };
    fetch(`https://gabkis.com/api/users/profile/bio`, {
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
        getUserData();
      });
    });
  };

  const addHobby = async () => {
    const data = { hobby };
    fetch(`https://gabkis.com/api/users/profile/hobbies`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        getUserData();
      });
    });
  };

  return (
    <div className="setting-container">
      <div className="setting-wrapper">
        <h2>Profile image</h2>
        <img
          className="settings-profile-img"
          src={`https://gabkis.com/api/images/${user.profileImage}`}
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
        <h2>{userData.firstName + " " + userData.lastName}</h2>
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
        <p>{userData.bio}</p>
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
        {userData &&
          userData.hobbies &&
          userData.hobbies.map((hobby) => {
            return <span>{hobby}</span>;
          })}
        {showHobbiesModal ? (
          <Modal
            zIndex={20}
            showModal={showHobbiesModal}
            setShowModal={setShowHobbiesModal}
          >
            <label>Hobbies</label>
            {userData &&
              userData.hobbies &&
              userData.hobbies.map((hobby) => {
                return <span>{hobby}</span>;
              })}
            <input
              onChange={(e) => {
                setHobby(e.target.value);
              }}
              type="text"
            ></input>
            <button onClick={addHobby}>Submit</button>
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
            <lable>Edit your work info</lable>
            <input type="text"></input>
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
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const closeDropdown = (e) => {
      console.log(e);
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  });
  return (
    <li className="nav-item" ref={ref}>
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
