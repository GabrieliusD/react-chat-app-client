import React from "react";
import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  const messageDate = new Date(message.created_at);
  const formatedSeconds =
    messageDate.getMinutes() < 10
      ? "0" + messageDate.getMinutes()
      : messageDate.getMinutes();
  const formatedTime = messageDate.getHours() + ":" + formatedSeconds;

  return (
    <div className={own ? "messageWrapper own" : "messageWrapper"}>
      <img className="senderImg" src="Sender Profile" alt="" />
      <p className="messageText">{message.text}</p>
      <span className="timestamp">{formatedTime}</span>
    </div>
  );
}
