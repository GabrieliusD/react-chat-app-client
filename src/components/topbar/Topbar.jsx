import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../searchbar/Searchbar";
import { AuthContext } from "../../context/AuthContext";
import {
  NavItem,
  DropdownMenu,
  DropdownItem,
  DropdownButton,
} from "../menu/Menu";
import { default as Modal } from "../modal/Modal";
import "./topbar.css";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="topbarContainer">
      <div className="leftTopbar">
        <SearchBar></SearchBar>
      </div>
      <div className="centerTopbar">
        <h1 className="test">Chat With Me</h1>
      </div>

      <div className="rightTopbar">
        <h3 className="profileText">{user.username}</h3>
        <NavItem icon={`http://localhost:8080/images/${user.profileImage}`}>
          <DropdownMenu>
            <DropdownItem leftIcon="Hi">My Profile</DropdownItem>
            <DropdownItem goToMenu="settings">Settings</DropdownItem>
            <DropdownButton setShowModal={setShowModal}></DropdownButton>
          </DropdownMenu>
        </NavItem>
        {showModal ? (
          <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
        ) : null}
      </div>
    </div>
  );
}
