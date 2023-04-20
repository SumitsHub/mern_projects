import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import './Chat.css'
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://realtime-chat-app-02.herokuapp.com";

let socket;
const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    if(socket) {
      return;
    }

    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    // console.log(socket);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // function for sending messagess
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
