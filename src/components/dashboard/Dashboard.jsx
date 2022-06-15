import React, { useState, useEffect, useRef } from "react";
import Topbar from "../topbar/Topbar";
import Friends from "../friends/Friends";
import Conversation from "../conversation/Conversation";
import Friend from "../friends/Friend";
import "./dashboard.css";
import { io } from "socket.io-client";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const [currentFriend, setCurrentFriend] = useState("");
  const [convos, setConvos] = useState([]);
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    socket.current = io("ws://localhost:8080");
  }, []);

  useEffect(() => {
    console.log("USER ID: ", user.id);
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      console.log("ONLINE USERS: ", users);
    });
  }, [user]);

  useEffect(() => {
    console.log("friend effect trigger");
    fetch("http://localhost:8080/convo", {
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) =>
      data.json().then((value) => {
        setConvos(value);
        console.log(value);
      })
    );
  }, []);
  useEffect(() => {
    console.log("current user set");
    console.log(currentFriend);
    if (!currentFriend) return;
    fetch(`http://localhost:8080/convo/${currentFriend.id}`, {
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) =>
      data.json().then((jsondata) => {
        setMessages(jsondata);
        console.log(jsondata);
      })
    );
  }, [currentFriend]);
  return (
    <div>
      <Topbar></Topbar>
      <div className="dashboardContainer">
        <div className="friendsWrapper">
          {convos.map((value, key) => {
            const selected = currentFriend === value ? true : false;
            return (
              <div className="friend" onClick={() => setCurrentFriend(value)}>
                <Friend
                  receiverUser={value?.participants[0]}
                  inbox={value}
                  selected={selected}
                ></Friend>
              </div>
            );
          })}
        </div>
        {currentFriend ? (
          <Conversation
            currentFriend={currentFriend}
            messages={messages}
            socket={socket}
          ></Conversation>
        ) : (
          "no conversation selected"
        )}
      </div>
    </div>
  );
}
