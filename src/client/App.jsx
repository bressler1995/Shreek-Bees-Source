import { useState, useEffect, useRef } from "react";
import "./App.css";
import Bar from "./components/Bar/Bar.jsx";
import io from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const sendMessage = (message) => {
    
  };

  const socket = io();

  return (
    <div className="App">
      {/* Canvas */}
      {messages.map((message, index) => (
          <li key={index}>{message.toString()}</li>
      ))}
      <Bar handleSend={sendMessage}/>
    </div>
  );
}

export default App;
