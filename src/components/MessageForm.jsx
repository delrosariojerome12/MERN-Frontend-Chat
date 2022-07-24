import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {RiSendPlaneFill} from "react-icons/ri";
import {useSelector} from "react-redux";
import {AppContext} from "../context/appContext";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

const MessageForm = () => {
  const [message, setMessage] = useState("");
  //   const [selectedRoom, setSelectedRoom] = useState("");
  const user = useSelector((state) => state.user);
  const {socket, setMessages, messages, privateMessages, currentRoom} =
    useContext(AppContext);

  const height = useRef(null);
  const [timer, setTimer] = useState("");

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    // console.log("room", roomMessages);
    setMessages(roomMessages);
  });

  const getFormatted = () => {
    const date = new Date();
    const year = new Date().getFullYear();
    const currentDate = date.getDate();

    let month = (1 + date.getMonth()).toString();
    month = month > 1 ? month : "0" + month;
    let day = date.getDay().toString();
    day = day.length > 1 ? day : "0" + day;

    return `${month}/${currentDate}/${year}`;
  };
  getFormatted();

  const todayDate = getFormatted();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    let hour = today.getHours();
    let period = "AM";
    if (hour > 12) {
      period = "PM";
      hour -= 12;
    } else if (hour === 12) {
      period = "PM";
    } else {
      period = "AM";
    }
    const time = `${hour}:${minutes} ${period}`;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setTimer(time);
    setMessage("");
  };

  const renderMessages = useCallback(() => {
    if (user && messages) {
      return messages.map(({_id: date, messagesByDate}, idx) => {
        return (
          <div className="message-date" key={idx}>
            <p>{date}</p>
            {messagesByDate.map(
              ({content, time, from: {name, picture, status, _id}}, idx) => {
                return (
                  <div
                    className={
                      user._id === _id
                        ? "message-content-user"
                        : "message-content"
                    }
                    key={idx}
                  >
                    <div className="text">
                      <p>{time}</p>
                      <p>{content}</p>
                    </div>
                    <img src={picture} alt="" />
                  </div>
                );
              }
            )}
          </div>
        );
      });
    }
  }, [user, messages]);

  useEffect(() => {
    setTimeout(() => {
      height.current.scrollTop = height.current.scrollHeight;
    }, 1000);
  }, [message]);

  return (
    <div className="message-form">
      <div ref={height} className="message-output">
        {renderMessages()}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Your Message"
        />
        <button type="submit">
          <RiSendPlaneFill />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
