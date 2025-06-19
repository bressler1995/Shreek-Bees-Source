import { useState, useEffect, useRef, use } from "react";
import "./App.css";
import Bar from "./components/Bar/Bar.jsx";
import io from 'socket.io-client';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  if(initialized == false) {
    setInitialized(true);
    const socket = io();
    console.log("Socket initialized");
  }

  const sendMessage = (message) => {
    socket.emit('message', JSON.stringify({message: message}));
  };

  return (
    <div className="App">
      {messages.map((message, index) => (
          <li key={index}>{}</li>
      ))}
      <Bar handleSend={sendMessage}/>
    </div>
  );
}

export default App;
