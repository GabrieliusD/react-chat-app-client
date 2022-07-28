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
    fetch(`https://gabkis.com/api/convo/${currentFriend.id}`, {
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

        console.log("MESSAGE", data);
        convos.forEach((value, index) => {
          if (value.participants[0].id === currentFriend.participants[0].id) {
            convos[index].last_message = text;
            convos[index].last_user_id = user.id;
            convos[index].last_message_send = new Date().toISOString();
          }
        });
      })
    );
  };
  useEffect(() => {
    socket.current = io("https://gabkis.com/api", {
      withCredentials: true,
      path: "/api/socket.io/",
    });
    console.log(socket.current);
    console.log("BINDING SOCKET");
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
    if (currentFriend) {
      console.log(currentFriend.participants[0].id);
      arrivalMessage &&
        currentFriend.participants.some(
          (e) => e.id === arrivalMessage.senderId
        ) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }
    console.log("CONVOS", convos);
    const newConvos = [...convos];
    newConvos.forEach((value, index) => {
      console.log(
        "participant:",
        value.participants[0].id,
        arrivalMessage.senderId
      );
      if (value.participants[0].id === arrivalMessage.senderId) {
        newConvos[index].last_message = arrivalMessage.text;
        newConvos[index].last_user_id = arrivalMessage.senderId;
        newConvos[index].last_message_send = new Date().toISOString();
      }
    });
    setConvos(newConvos);
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
    fetch("https://gabkis.com/api/convo", {
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) =>
      data.json().then((value) => {
        setConvos(value);
        console.log(value);

        if (value.length > 0) {
          setCurrentFriend(value[0]);
        }
      })
    );
  }, []);
  useEffect(() => {
    console.log("current user set");
    console.log(currentFriend);
    if (!currentFriend) return;
    fetch(`https://gabkis.com/api/convo/${currentFriend.id}`, {
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
      <div id="modal"></div>
      <Topbar key="topbar"></Topbar>
      <div className="dashboardContainer">
        <div className="friendsWrapper">
          {convos.map((value, key) => {
            const selected = currentFriend === value ? true : false;
            return (
              <div
                key={value.id}
                className="friend"
                onClick={() => setCurrentFriend(value)}
              >
                <Friend
                  key={value.id}
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
