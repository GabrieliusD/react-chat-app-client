import React from "react";
import Friend from "./Friend";
import "./friend.css";

export default function Friends() {
  return (
    <div className="friendWrapper">
      <Friend></Friend>
      <Friend></Friend>
      <Friend></Friend>
    </div>
  );
}
