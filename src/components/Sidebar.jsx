import React, {useContext, useEffect} from "react";
import {AppContext} from "../context/appContext";
import {useSelector, useDispatch} from "react-redux/es/exports";
import {addNotification, resetNotification} from "../features/userSlice";

const Sidebar = () => {
  const {
    socket,
    setMembers,
    members,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
    privateMessages,
    setPrivateMessages,
  } = useContext(AppContext);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert("Please Log in");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMessages(null);
    }
    // notif
    dispatch(resetNotification(room));
  };

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotification(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRooms = () => {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "_" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  console.log(user);

  const handlePrivateMessage = (member) => {
    setPrivateMessages(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };
  return (
    <div className="sidebar">
      <div className="rooms">
        <h3>Available Rooms</h3>
        <div className="buttons">
          {rooms.map((room, index) => (
            <button
              style={room === currentRoom ? {background: "#fdb52f"} : null}
              onClick={() => joinRoom(room)}
              key={index}
            >
              {room}
              {currentRoom !== room && <span>{user.newMessages[room]}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="members">
        <h3>Members</h3>
        <div className="members-con">
          {members
            .filter((person) => person._id !== user._id)
            .map((person) => {
              const {name, picture, _id, status} = person;
              return (
                <div
                  onClick={() => handlePrivateMessage(person)}
                  className="people"
                  key={_id}
                  style={
                    privateMessages?._id === person._id
                      ? {background: "#fdb52f"}
                      : null
                  }
                >
                  <img
                    className={status === "online" ? "online" : "offline"}
                    src={picture}
                    alt={`${name}.img`}
                  />
                  <p>{name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
