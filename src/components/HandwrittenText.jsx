import React, { useState, useEffect } from 'react';

export default function HandwrittenText({ text = "happy birthday to my favorite person", speed = 55, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let currentLen = 0;

    const timer = setInterval(() => {
      currentLen++;
      if (currentLen <= text.length) {
        setDisplayedText(text.slice(0, currentLen));
      } else {
        clearInterval(timer);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="handwriting-container">
      <span className="handwriting-text">
        {displayedText}
        {isTyping && <span className="typing-pencil-cursor" />}
      </span>
    </div>
  );
}
