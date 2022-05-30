import React from "react";
import "./message.css";
export default function Message({ own }) {
  return (
    <div className={own ? "messageWrapper own" : "messageWrapper"}>
      <img className="senderImg" src="Sender Profile" alt="" />
      <p className="messageText">
        This is a message like for example you can say hello
      </p>
      <span className="timestamp">1 hour ago</span>
    </div>
  );
}
