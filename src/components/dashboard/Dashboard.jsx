import React from "react";
import Topbar from "../topbar/Topbar";
import Friends from "../friends/Friends";
import Conversation from "../conversation/Conversation";
import "./dashboard.css";
export default function Dashboard() {
  return (
    <div>
      <Topbar></Topbar>
      <div className="dashboardContainer">
        <Friends></Friends>
        <Conversation></Conversation>
      </div>
    </div>
  );
}
