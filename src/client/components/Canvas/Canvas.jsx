// App.jsx
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Message from './Message';
import "./Canvas.css";
import Box from '@mui/material/Box';

// --- Main App Component ---
export default function App() {
  
  const [messages, setMessages] = useState([
    { sid: 'sid-101', text: 'First message content.', x: 50, y: 50 },
    { sid: 'sid-102', text: 'Second message with important details.', x: 100, y: 150 },
    { sid: 'sid-103', text: 'Third message, short and sweet.', x: 150, y: 250 },
    { sid: 'sid-104', text: 'Fourth message, a bit longer to test layout.', x: 200, y: 350 },
    { sid: 'sid-105', text: 'Fifth message, last one for the demo.', x: 250, y: 350 },
  ]);

  // Only PointerSensor for mouse drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  function handleDragEnd(event) {
    const { active, delta } = event; // 'delta' contains the {x, y} movement from drag start

    setMessages((prevMessages) => {
      return prevMessages.map((msg) => {
        if (msg.sid === active.id) {
          // Update the message's persistent position by adding the drag delta
          // This ensures it stays at the new dropped location
          return {
            ...msg,
            x: msg.x + delta.x,
            y: msg.y + delta.y,
          };
        }
        return msg;
      });
    });

    // This is where you would typically update your backend
    // with the new position of the message (active.id and its new x, y coordinates).
    console.log(`Message ${active.id} moved by (${delta.x}, ${delta.y}).`);
    console.log('New message positions (check state):', messages.map(m => ({sid: m.sid, x: m.x, y:m.y})));
  }

  return (
    <Box className='app-canvas'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* Directly map Message components, no SortableContext */}
          {messages.map((message) => (
            <Message
              key={message.sid} // Use sid as key for React list rendering
              sid={message.sid}
              text={message.text}
              initialX={message.x} // Pass current x as initialX
              initialY={message.y} // Pass current y as initialY
            />
          ))}
        </DndContext>
    </Box>
  );
}