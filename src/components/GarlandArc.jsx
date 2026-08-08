import React from 'react';

export default function GarlandArc() {
  // Generate star bulbs along the curve
  const starsCount = 12;
  const starBulbs = Array.from({ length: starsCount }).map((_, i) => {
    const ratio = (i + 1) / (starsCount + 1);
    const x = ratio * 100;
    // Semicircle arc curve formula: y = sin(ratio * PI) * maxDepth
    const y = Math.sin(ratio * Math.PI) * 110; 
    const delay = (i * 0.25).toFixed(1);
    return { x, y, delay, id: i };
  });

  return (
    <div className="garland-ceiling-arc">
      {/* SVG String Arc hanging between two corners of ceiling */}
      <svg className="garland-svg-arc" viewBox="0 0 1000 150" preserveAspectRatio="none">
        <path 
          d="M 0,0 Q 500,160 1000,0" 
          fill="none" 
          stroke="#7c5f3b" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
      </svg>

      {/* Star Lights along the hanging arc */}
      {starBulbs.map((star) => (
        <div
          key={star.id}
          className="hanging-star-bulb"
          style={{
            left: `${star.x}%`,
            top: `${star.y}px`,
            animationDelay: `${star.delay}s`
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffdd67">
            <path d="M12 2l2.8 6.6 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7-5.4-4.8 7.2-.6z" />
          </svg>
          <div className="star-glow-halo" />
        </div>
      ))}
    </div>
  );
}
