// Message.jsx
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Message({ messageIndex, sid, text, initialX, initialY }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform, // This transform represents the current drag offset
  } = useDraggable({ id: messageIndex }); // Use sid as the dnd-kit 'id'

  // Apply initial position and the current drag transform.
  // The 'transform' from useDraggable provides the delta during the drag.
  const style = {
    position: 'absolute', // Essential for free-form positioning
    left: initialX,      // Set initial X position
    top: initialY,       // Set initial Y position
    transform: CSS.Transform.toString(transform), // Apply current drag translation
    cursor: 'grab',      // Visual feedback for drag capability
    // Minimal styling to make the dialogs visible
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
    zIndex: transform ? 1000 : 'auto', // Bring dragged item to front
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{text}</p> {/* Display the 'text' */}
      <span>SID: {sid}</span> {/* Display the 'sid' */}
    </div>
  );
}

export default Message;