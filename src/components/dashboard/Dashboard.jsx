import React, { useState, useEffect } from "react";
import Topbar from "../topbar/Topbar";
import Friends from "../friends/Friends";
import Conversation from "../conversation/Conversation";
import Friend from "../friends/Friend";
import "./dashboard.css";
export default function Dashboard() {
  const [currentFriend, setCurrentFriend] = useState("");
  const [convos, setConvos] = useState([]);
  const [messages, setMessages] = useState([]);
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
            return (
              <div onClick={() => setCurrentFriend(value)}>
                <Friend user={value?.participants[0]}></Friend>
              </div>
            );
          })}
        </div>
        {currentFriend ? (
          <Conversation
            currentFriend={currentFriend}
            messages={messages}
          ></Conversation>
        ) : (
          "no conversation selected"
        )}
      </div>
    </div>
  );
}
