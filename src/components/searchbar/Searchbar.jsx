import React, { useEffect, useState } from "react";
import "./searchbar.css";
import User from "../user/User";
import Modal from "../modal/Modal";
import { useRef } from "react";
export default function SearchBar({ placeholder }) {
  const [focused, setFocused] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentInput, setCurrentInput] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const ref = useRef();

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
    const users = await fetch(`https://gabkis.com/api/users/${value}`);
    const jsondata = await users.json();
    setData(jsondata);
    console.log(jsondata);
  };

  const selectUser = (value) => {
    inputChange(value.username);
    setCurrentInput(value.username);
    setShowUserModal((prev) => !prev);
    console.log(value);
    fetch(`https://gabkis.com/api/users/profile/${value.id}`, {
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
    fetch("https://gabkis.com/api/convo/create", {
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
          onChange={(e) => inputChange(e.target.value)}
        />
      </div>
      {data.length > 0 && focused ? (
        <div className="dataResult">
          {data.map((value, key) => {
            return (
              <User
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
            <img className="user-img"></img>
            <span>{selectedUser.firstname + " " + selectedUser.lastname}</span>
            <span>About User</span>

            <p className="bio">
              {selectedUser.bio ? selectedUser.bio : "No bio available"}
            </p>
            <span>hobbies</span>
            {selectedUser &&
              selectedUser.hobbies &&
              selectedUser.hobbies.map((hobby) => {
                return <span>{hobby}</span>;
              })}
            <span>Work</span>
            <button onClick={() => createConvo(selectedUser.id)}>
              Start Conversation
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
