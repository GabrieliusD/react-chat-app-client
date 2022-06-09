import React, { useState, useEffect } from "react";
import Topbar from "../topbar/Topbar";
import Friends from "../friends/Friends";
import Conversation from "../conversation/Conversation";
import Friend from "../friends/Friend";
import "./dashboard.css";
export default function Dashboard() {
  const [currentFriend, setCurrentFriend] = useState("");
  const [convos, setConvos] = useState([]);
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
    fetch(`http://localhost:8080/convo/${currentFriend}`, {
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) =>
      data.json().then((jsondata) => {
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
              <div onClick={() => setCurrentFriend(value.id)}>
                <Friend user={value.participants[0]}></Friend>
              </div>
            );
          })}
        </div>
        <Conversation></Conversation>
      </div>
    </div>
  );
}
