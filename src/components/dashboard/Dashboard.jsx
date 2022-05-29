import React from "react";
import Topbar from "../topbar/Topbar";
import Friends from "../friends/Friends";
import Conversation from "../conversation/Conversation";
export default function Dashboard() {
  return (
    <div>
      <Topbar></Topbar>
      <Friends></Friends>
      <Conversation></Conversation>
    </div>
  );
}
