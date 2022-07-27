import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import "./friend.css";

export default function Friends() {
  const [convos, setConvos] = useState([]);
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
      })
    );
  }, []);
  return <div className="friendsWrapper"></div>;
}
