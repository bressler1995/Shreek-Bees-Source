import { useState, useEffect, useRef, use } from "react";
import "./App.css";
import Bar from "./components/Bar/Bar.jsx";
import io from 'socket.io-client';

const socket = io();
console.log("Socket initialized");

function App() {
  const initialMessages = [];
  const [messages, setMessages] = useState(initialMessages);
  const socketRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  if(initialized == false) {
    setInitialized(true);

    socket.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      console.log("Received:" + message);
      handleMessages(parsedMessage);
    });
    
    socket.on('all', (message) => {
      const parsedMessage = JSON.parse(message);
      console.log("Received:" + message);
      handleMessages(parsedMessage);
    });
  }

  const handleMessages = (messageParam) => {
    setMessages(prevMessages => [...prevMessages, messageParam]);
  }

  const handleSend = (element) => {
    if(element != null && element.length == 1) {
      let elementValue = element[0].value;

      if(elementValue == '') {
        alert("You message cannot be blank. Please enter a message.");
      } else {
        const parsedPayload = {text: elementValue, sid: socket.id};
        const payload = JSON.stringify(parsedPayload);
        handleMessages(parsedPayload);
        socket.emit('message', payload);
      }
    }
  };

  return (
    <div className="App">
      {messages.map((message, index) => (
          <li>{message.text}</li>
      ))}
      <Bar handleSend={handleSend}/>
    </div>
  );
}

export default App;
