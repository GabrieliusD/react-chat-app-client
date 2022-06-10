import React from "react";
import "./message.css";
export default function Message({ message, own }) {
  return (
    <div className={own ? "messageWrapper own" : "messageWrapper"}>
      <img className="senderImg" src="Sender Profile" alt="" />
      <p className="messageText">{message.text}</p>
      <span className="timestamp">1 hour ago</span>
    </div>
  );
}
