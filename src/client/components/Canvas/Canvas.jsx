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

export default function Canvas({setMessages, messages}) {

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const indexedMessages = messages.map((child, index) => {
    console.log(index);
    return {messageIndex: index, sid: child.sid, text: child.text, x: child.x, y: child.y};
  });

  function handleDragEnd(event) {
    const { active, delta } = event;

    const updatedMessages = indexedMessages.map((child) => {
      if(child.messageIndex == active.id) {
        console.log(child);
        return {messageIndex: child.messageIndex, sid: child.sid, text: child.text, x: child.x + delta.x, y: child.y + delta.y};
      } else {
        return child;
      }
    });

    setMessages(updatedMessages);

    // console.log(`Message ${active.id} moved by (${delta.x}, ${delta.y}).`);
    // console.log('New message positions (check state):', messages.map(m => ({sid: m.sid, x: m.x, y:m.y})));
  }

  return (
    <Box className='app-canvas'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {indexedMessages.map((child) => (
            <Message
              key={child.messageIndex}
              messageIndex={child.messageIndex}
              sid={child.sid}
              text={child.text}
              initialX={child.x}
              initialY={child.y}
            />
          ))}
        </DndContext>
    </Box>
  );
}