import { useState, useEffect, useRef, use } from "react";
import "./App.css";
import io from 'socket.io-client';
import Bar from "./components/Bar/Bar.jsx";
import Canvas from "./components/Canvas/Canvas.jsx";
import UI from "./components/UI/UI.jsx";

// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const socket = io();

function App() {
  const initialMessages = [];
  const [messages, setMessages] = useState(initialMessages);
  const socketRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 320,
          md: 768,
          lg: 1025
        },
      },
      typography: {
        h3: {
          fontWeight: 700,
        }
      },
      palette: {
        mode: 'dark',
        primary: purple
      }
    });

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

  const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSend = (element) => {
    if(element != null && element.length == 1) {
      let elementValue = element[0].value;

      if(elementValue == '') {
        alert("You message cannot be blank. Please enter a message.");
      } else {
        const parsedPayload = {text: elementValue, sid: socket.id, x: getRand(0, 500), y: getRand(0, 500)};
        const payload = JSON.stringify(parsedPayload);
        handleMessages(parsedPayload);
        socket.emit('message', payload);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <UI>
        <Canvas setMessages={setMessages} messages={messages}/>
        <Bar handleSend={handleSend}/>
      </UI>
    </ThemeProvider>
  );
}

export default App;
