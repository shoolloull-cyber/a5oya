import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, RotateCcw } from 'lucide-react';

export default function AudioPlayer({ autoStart = false, onReplayText }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Simple happy birthday / soothing tune notes
  const notes = [
    { note: 261.63, duration: 0.4 }, // C4
    { note: 261.63, duration: 0.4 }, // C4
    { note: 293.66, duration: 0.8 }, // D4
    { note: 261.63, duration: 0.8 }, // C4
    { note: 349.23, duration: 0.8 }, // F4
    { note: 329.63, duration: 1.2 }, // E4
    
    { note: 261.63, duration: 0.4 }, // C4
    { note: 261.63, duration: 0.4 }, // C4
    { note: 293.66, duration: 0.8 }, // D4
    { note: 261.63, duration: 0.8 }, // C4
    { note: 392.00, duration: 0.8 }, // G4
    { note: 349.23, duration: 1.2 }, // F4

    { note: 261.63, duration: 0.4 }, // C4
    { note: 261.63, duration: 0.4 }, // C4
    { note: 523.25, duration: 0.8 }, // C5
    { note: 440.00, duration: 0.8 }, // A4
    { note: 349.23, duration: 0.8 }, // F4
    { note: 329.63, duration: 0.8 }, // E4
    { note: 293.66, duration: 1.0 }, // D4

    { note: 466.16, duration: 0.4 }, // A#4
    { note: 466.16, duration: 0.4 }, // A#4
    { note: 440.00, duration: 0.8 }, // A4
    { note: 349.23, duration: 0.8 }, // F4
    { note: 392.00, duration: 0.8 }, // G4
    { note: 349.23, duration: 1.5 }, // F4
  ];

  const playMelody = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    let currentTime = ctx.currentTime + 0.1;

    const playSequence = () => {
      if (!isPlayingRef.current) return;

      notes.forEach(({ note, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, currentTime);

        // Soft envelope
        gain.gain.setValueAtTime(0.001, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration - 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(currentTime);
        osc.stop(currentTime + duration);

        currentTime += duration * 0.95;
      });

      // Loop after sequence ends
      const totalTime = notes.reduce((sum, n) => sum + n.duration * 0.95, 0);
      setTimeout(() => {
        if (isPlayingRef.current) {
          currentTime = ctx.currentTime + 0.1;
          playSequence();
        }
      }, totalTime * 1000);
    };

    playSequence();
  };

  const stopMelody = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      playMelody();
    }
  };

  useEffect(() => {
    if (autoStart && !isPlaying) {
      playMelody();
    }
  }, [autoStart]);

  return (
    <div className="controls-bar">
      {onReplayText && (
        <button 
          className="control-btn" 
          onClick={onReplayText} 
          title="Replay Handwriting"
        >
          <RotateCcw size={20} />
        </button>
      )}
      <button 
        className="control-btn" 
        onClick={toggleMusic} 
        title={isPlaying ? "Mute Music" : "Play Birthday Tune"}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
