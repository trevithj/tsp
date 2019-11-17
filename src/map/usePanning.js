import { useState } from 'react';

const usePanning = () => {
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [xy, setXY] = useState({ x: 0, y: 0 });
  return {
    xy,
    dragStart: evt => {
      console.log(evt.clientX, evt.clientY);
      setOrigin({ x: evt.clientX, y: evt.clientY });
      setDragging(true);
    },
    drag: evt => {
      if (dragging) {
        evt.preventDefault();
        setXY({ x: evt.clientX - origin.x, y: evt.clientY - origin.y });
      }
    },
    dragEnd: evt => {
      setDragging(false);
    }
  };
};

export default usePanning;
