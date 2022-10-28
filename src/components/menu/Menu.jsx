import React, { useRef } from "react";
import { useState } from "react";
import "./menu.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { default as Modal } from "../modal/Modal";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const profileImageLink = () => {
    console.log(user);
    if (user.profileImage)
      return `${process.env.REACT_APP_API_URL}/images/${user.profileImage}`;
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
  };
  const getUserData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/profile/${user.id}`, {
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

    fetch(`${process.env.REACT_APP_API_URL}/upload/`, {
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
    fetch(`${process.env.REACT_APP_API_URL}/users/profile/name`, {
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
        toast("Wow so easy!");
        getUserData();
        //dispatch({ type: "UPLOAD_IMAGE", payload: jsondata.image });
      });
    });
  };

  const updateBio = async () => {
    console.log("attempt to call toast");
    const notify = () => toast("Wow so easy!");
    notify();
    if (bio.length === 0) return;
    const data = { bio };
    fetch(`${process.env.REACT_APP_API_URL}/users/profile/bio`, {
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
    fetch(`${process.env.REACT_APP_API_URL}/users/profile/hobbies`, {
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
        <img className="settings-profile-img" src={profileImageLink()}></img>

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
        <button
          className="input-button"
          onClick={() => setShowImageModal((prev) => !prev)}
        >
          Edit
        </button>
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
            <div className="input-field">
              <label>First Name:</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="input-field">
              <label>Last Name:</label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <button className="input-button" onClick={changeUsername}>
              Submit
            </button>
          </Modal>
        ) : null}
        <button
          className="input-button"
          onClick={() => setShowNameModal((prev) => !prev)}
        >
          Edit
        </button>
      </div>
      <div className="setting-wrapper">
        <h2>Bio:</h2>
        <p>{userData.bio || "no bio available"}</p>
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
            <button className="input-button" onClick={updateBio}>
              Submit
            </button>
          </Modal>
        ) : null}
        <button
          className="input-button"
          onClick={() => setShowBioModal((prev) => !prev)}
        >
          Edit
        </button>
      </div>
      <div className="setting-wrapper">
        <h2>Hobbies:</h2>
        {userData && userData.hobbies > 0
          ? userData.hobbies.map((hobby) => {
              return <span>{hobby}</span>;
            })
          : "no hobbies"}
        {showHobbiesModal ? (
          <Modal
            zIndex={20}
            showModal={showHobbiesModal}
            setShowModal={setShowHobbiesModal}
          >
            {userData && userData.hobbies > 0
              ? userData.hobbies.map((hobby) => {
                  return <span className="hobby">{hobby}</span>;
                })
              : "no hobbies"}
            <div className="hobby-container">
              <span className="hobby">Hobby1</span>
              <span className="hobby">Hobby2</span>
              <span className="hobby">Hobby3</span>
              <span className="hobby">Hobby3</span>
            </div>

            <input
              onChange={(e) => {
                setHobby(e.target.value);
              }}
              type="text"
            ></input>
            <button className="input-button" onClick={addHobby}>
              Submit
            </button>
          </Modal>
        ) : null}
        <button
          className="input-button"
          onClick={() => setShowHobbiesModal((prev) => !prev)}
        >
          Edit
        </button>
      </div>
      {
        //work info
      }
      {/* <div className="setting-wrapper">
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
      </div> */}
      <ToastContainer />
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
  const closeNav = () => {
    setOpen(false);
  };
  const toggleOpen = () => {
    setOpen(!open);
  };
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
  const createChild = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { closeNav });
    }
  });
  return (
    <li className="nav-item" ref={ref}>
      <img
        src={props.icon}
        className="icon-button-profile"
        onClick={() => setOpen(!open)}
      ></img>
      {open && createChild}
    </li>
  );
}

export function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const closeNav = () => {
    props.closeNav();
  };
  const createChild = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { closeNav });
    }
  });
  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">{createChild}</div>
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

export function DropdownButton(props, closeNav) {
  const buttonClicked = () => {
    props.onButtonClicked();
    console.log("button clicked");
    props.closeNav();
  };
  return (
    <a href="#" className="menu-item" onClick={buttonClicked}>
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
