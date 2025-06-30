'use client';
import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      dot.remove();
    };
  }, []);

  return null;
}
