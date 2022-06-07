import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import "./friend.css";

export default function Friends() {
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
        console.log(value.conv);
      })
    );
  }, [convos]);
  return (
    <div className="friendsWrapper">
      {convos.map((value) => {
        return <Friend>{value.username}</Friend>;
      })}
      <Friend></Friend>
      <Friend></Friend>
      <Friend></Friend>
    </div>
  );
}
