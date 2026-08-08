import React, { useState, useEffect } from 'react';
import EnvelopeSection from './components/EnvelopeSection';
import CelebrationSection from './components/CelebrationSection';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);

  // Lock scroll until envelope is opened
  useEffect(() => {
    if (!hasOpened) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [hasOpened]);

  const handleOpen = () => {
    setHasOpened(true);
    // Small delay so overflow unlocks before scroll
    setTimeout(() => {
      const section2El = document.getElementById('section2');
      if (section2El) {
        section2El.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="app-container">
      <EnvelopeSection onOpen={handleOpen} />
      {hasOpened && <CelebrationSection isVisible={hasOpened} />}
    </div>
  );
}
