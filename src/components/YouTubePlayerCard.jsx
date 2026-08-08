import React, { useState, useRef } from 'react';
import { Play, Pause, FastForward, Rewind, Volume2, VolumeX } from 'lucide-react';

export default function YouTubePlayerCard({ videoId = "hICNu-xTBsU" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef(null);

  const postYTCommand = (command, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: args }),
        '*'
      );
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      postYTCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      postYTCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const handleRewind = () => {
    postYTCommand('seekTo', [0, true]);
  };

  const handleForward = () => {
    postYTCommand('seekTo', [30, true]);
  };

  const toggleMute = () => {
    if (isMuted) {
      postYTCommand('unMute');
      setIsMuted(false);
    } else {
      postYTCommand('mute');
      setIsMuted(true);
    }
  };

  return (
    <div className="player-card-container">
      {/* Ambient Glow Aura */}
      <div className="player-ambient-glow" />

      <div className="player-frame-wrapper">
        {/* YouTube Video Embedded inside the Top Screen Area */}
        <div className="youtube-screen-area">
          <iframe
            ref={iframeRef}
            className="youtube-iframe"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=1&rel=0&modestbranding=1`}
            title="Birthday Song"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Player Frame Graphic Overlay */}
        <img 
          src="/assets/player_frame_v2_trans.png" 
          alt="Music Player Frame" 
          className="player-frame-img"
        />

        {/* Interactive Controls Bar Overlay */}
        <div className="player-controls-overlay">
          <button className="yt-ctrl-btn" onClick={handleRewind} title="Rewind">
            <Rewind size={18} fill="white" />
          </button>
          
          <button className="yt-ctrl-btn play-main" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" />}
          </button>
          
          <button className="yt-ctrl-btn" onClick={handleForward} title="Skip 30s">
            <FastForward size={18} fill="white" />
          </button>

          <button className="yt-ctrl-btn mute-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
