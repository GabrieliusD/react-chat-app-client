import React, { useEffect, useState, useContext } from "react";
import "./searchbar.css";
import User from "../user/User";
import Modal from "../modal/Modal";
import { useRef } from "react";
import { ReactComponent as ArrowIcon } from "../../icons/angle-double-right.svg";
import { AuthContext } from "../../context/AuthContext";

export default function SearchBar({ placeholder }) {
  const [focused, setFocused] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentInput, setCurrentInput] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const ref = useRef();
  const { user } = useContext(AuthContext);
  const profileImageLink = () => {
    if (selectedUser.image)
      return `${process.env.REACT_APP_API_URL}/images/${selectedUser.image}`;
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
  };
  useEffect(() => {
    const closeDropdown = (e) => {
      console.log(e);
      if (ref.current && !ref.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  });

  const inputChange = async (value) => {
    setCurrentInput(value);
    if (value === "") {
      setData([]);
      return;
    }
    const users = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${value}`
    );
    const jsondata = await users.json();
    setData(jsondata);
    console.log(jsondata);
  };

  const selectUser = (value) => {
    inputChange(value.username);
    setCurrentInput(value.username);
    setShowUserModal((prev) => !prev);
    console.log(value);
    fetch(`${process.env.REACT_APP_API_URL}/users/profile/${value.id}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.status === 200
        ? response.json().then((json) => {
            setSelectedUser(json.data.userProfile);
            console.log(json.data.userProfile);
          })
        : response.json().then((data) => console.log(data));
    });
    //createConvo(value.id);
  };

  const createConvo = (id) => {
    console.log(id);
    fetch(`${process.env.REACT_APP_API_URL}/convo/create`, {
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
    <div className="search" ref={ref} onFocus={(e) => setFocused(true)}>
      <div className="searchInput">
        <input
          type="text"
          value={currentInput}
          placeholder="Search"
          onChange={(e) => inputChange(e.target.value)}
        />
      </div>
      {data.length > 0 && focused ? (
        <div className="dataResult">
          {data.map((value, key) => {
            return (
              <User
                icon={<ArrowIcon />}
                userFound={value}
                clickHandle={() => {
                  selectUser(value);
                  setFocused(false);
                }}
              ></User>
            );
          })}
        </div>
      ) : null}
      {showUserModal ? (
        <Modal showModal={showUserModal} setShowModal={setShowUserModal}>
          <div className="user-profile-modal">
            <img className="user-img" src={profileImageLink()}></img>
            <span>
              <b>Full Name</b>
            </span>
            <span>{selectedUser.firstname + " " + selectedUser.lastname}</span>
            <span>
              <b>About User</b>
            </span>

            <p className="bio">
              {selectedUser.bio ? selectedUser.bio : "No bio available"}
            </p>
            <span>
              <b>hobbies</b>
            </span>
            {selectedUser && selectedUser.hobbies > 0
              ? selectedUser.hobbies.map((hobby) => {
                  return <span>{hobby}</span>;
                })
              : "no hobbies"}
            <button
              className="user-profile-button"
              onClick={() => createConvo(selectedUser.id)}
            >
              Start Conversation
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
