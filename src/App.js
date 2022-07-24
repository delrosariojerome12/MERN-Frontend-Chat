import React, {useState} from "react";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import {Route, Routes} from "react-router-dom";
import "./styles/css/main.css";
import {useSelector} from "react-redux/es/exports";
import {AppContext, socket} from "./context/appContext";
const App = () => {
  const user = useSelector((state) => state.user);

  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState({});
  const [newMessages, setNewMessages] = useState([]);

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        rooms,
        setRooms,
        members,
        setMembers,
        messages,
        setMessages,
        privateMessages,
        setPrivateMessages,
        newMessages,
        setNewMessages,
      }}
    >
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? (
            <>
              <Route path="/chat" element={<Chat />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
