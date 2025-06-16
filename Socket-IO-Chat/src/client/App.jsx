import { useState, useEffect, useRef } from "react";
import "./App.css";
import Bar from "./components/Bar/Bar.jsx";

function App() {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the correct WebSocket server URL (port 5000)
    socketRef.current = new WebSocket('ws://localhost:5000');

    // Event handler for when the WebSocket connection is opened
    socketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
      setMessages([]); // Clear messages on connect to avoid duplicates
      // Send a message to the server (optional)
    };

    // Event handler for receiving messages from the server
    socketRef.current.onmessage = (event) => {
      // Ignore the welcome message, only add real chat messages
      if (event.data !== 'Welcome to the WebSocket server!') {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };

    // Event handler for WebSocket errors
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Event handler for when the WebSocket connection is closed
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({message: message}));
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  return (
    <div className="App">
      {/* Canvas */}
      {messages.map((message, index) => (
          <li key={index}>{message.toString()}</li>
      ))}
      <Bar />
      <button onClick={() => {sendMessage("Hello")}}>Send</button>
    </div>
  );
}

export default App;
