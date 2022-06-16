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
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();
  const { user } = useContext(AuthContext);

  const sendMessage = async (text, resetText) => {
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: currentFriend.participants[0].id,
      text,
    });
    fetch(`http://localhost:8080/convo/${currentFriend.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ text, userId: user.id }),
    }).then((response) =>
      response.json().then((data) => {
        setMessages((prev) => [...prev, data]);

        resetText();
        console.log(messages);
      })
    );
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8080", { withCredentials: true });
    socket.current.on("getMessage", (data) => {
      console.log("MESSAGE ARRIVED: ", data);
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    console.log("CURRENT FRIEND: ", currentFriend);
    if (!arrivalMessage) return;
    console.log(arrivalMessage);
    console.log(currentFriend.participants[0].id);
    arrivalMessage &&
      currentFriend.participants.some(
        (e) => e.id === arrivalMessage.senderId
      ) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

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
            sendCallback={sendMessage}
          ></Conversation>
        ) : (
          "no conversation selected"
        )}
      </div>
    </div>
  );
}
