import React from "react";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
const Chat = () => {
  return (
    <div className="chat">
      <Sidebar />
      <MessageForm />
    </div>
  );
};

export default Chat;
