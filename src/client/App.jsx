import { useState, useEffect, useRef, use } from "react";
import "./App.css";
import Bar from "./components/Bar/Bar.jsx";
import io from 'socket.io-client';

const socket = io();
console.log("Socket initialized");

function App() {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const sendMessage = (element) => {
    if(element != null && element.length == 1) {
      let elementValue = element[0].value;

      if(elementValue == '') {
        alert("You message cannot be blank. Please enter a message.");
      } else {
        socket.emit('message', JSON.stringify({message: 'Message from the client'}));
      }
    }
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
