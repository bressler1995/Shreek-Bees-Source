import { useState, useEffect, useRef, use } from "react";
import "./App.css";
import Bar from "./components/Bar/Bar.jsx";
import io from 'socket.io-client';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  let outterSocket;

  if(initialized == false) {
    setInitialized(true);
    const socket = io();
    console.log("Socket initialized");

    socket.emit('message', JSON.stringify({message: 'Message from the client'}));
  }

  const sendMessage = (element) => {
    if(element != null && element.length == 1) {
      let elementValue = element[0].value;

      if(elementValue == '') {
        alert("You message cannot be blank. Please enter a message.");
      } else {
        console.log(elementValue);
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
