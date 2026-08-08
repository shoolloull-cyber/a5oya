import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HandwrittenText from './HandwrittenText';
import GarlandArc from './GarlandArc';
import YouTubePlayerCard from './YouTubePlayerCard';
import PhotoBookSection from './PhotoBookSection';
import StarWaveDivider from './StarWaveDivider';
import confetti from 'canvas-confetti';

// ===== ألوان البلالين المتطايرة في سيكشن الأغنية =====
const REALISTIC_BALLOON_COLORS = ['#ff6b8a', '#ffdd67', '#7ecbff', '#c88fff', '#ff9a5c', '#a8e6cf'];

function RealisticBalloon({ color, style }) {
  return (
    <div className="realistic-floating-balloon" style={style}>
      <svg width="48" height="66" viewBox="0 0 52 70">
        <defs>
          <radialGradient id={`balloon-grad-${color.replace('#','')}`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="40%" stopColor={color} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1a233a" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        <ellipse cx="26" cy="26" rx="22" ry="26" fill={`url(#balloon-grad-${color.replace('#','')})`} />
        <polygon points="26,52 22,55 26,70 30,55" fill={color} opacity="0.8" />
        <path d="M26,52 Q28,60 26,70" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
      </svg>
    </div>
  );
}

export default function CelebrationSection({ isVisible }) {
  useEffect(() => {
    if (isVisible) {
      // ---- انفجار علوي أول ----
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { y: 0.35 },
        colors: ['#ffdd67', '#ffffff', '#ff85a1', '#7ecbff', '#ffd3b6'],
        disableForReducedMotion: true,
      });

      // ---- انفجار سفلي ثانٍ يتصاعد من أسفل الشاشة ----
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 90,
          spread: 100,
          origin: { y: 0.85 },
          colors: ['#ffdd67', '#ffffff', '#a8e6cf', '#ff6b8a', '#c88fff'],
          disableForReducedMotion: true,
        });
      }, 350);
    }
  }, [isVisible]);

  return (
    <div className="celebration-full-flow">

      {/* ========================================================= */}
      {/* ===== سيكشن 2: صورة الشخص بين الرقمين (العمر) ===== */}
      {/* ========================================================= */}
      <section className="section section-birthday" id="section2">
        {/* زينة النجوم في السقف */}
        <GarlandArc />

        {/* صور باقات البلالين على الجانبين */}
        <div className="floating-balloon-bouquet left-bouquet">
          <img src="/assets/balloon_bouquet_trans.png" alt="Balloon Bouquet Left" className="balloon-bouquet-img" />
        </div>
        <div className="floating-balloon-bouquet right-bouquet">
          <img src="/assets/balloon_bouquet_trans.png" alt="Balloon Bouquet Right" className="balloon-bouquet-img" />
        </div>

        {/* ---- صورة الشخص بين الرقمين (العمر) ---- */}
        <motion.div 
          className="birthday-art-wrapper"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.85, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="birthday-art-card">
            <img 
              src="/assets/boy_23_trans.png" 
              alt="Age 23 Birthday Card" 
              className="birthday-art-img"
            />
          </div>
        </motion.div>

        {/* ---- الكلام اللي بيتكتب بخط اليد تحت الصورة ---- */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HandwrittenText 
              text="Happy Birthday to my brother Ahmed! 🎂" 
              speed={50}
            />
          </motion.div>
        )}
      </section>

      {/* ===== فاصل الموجة بين السيكشنين ===== */}
      <StarWaveDivider />

      {/* ========================================================= */}
      {/* ===== سيكشن 3: الأغنية والرسالة والبلالين ===== */}
      {/* ========================================================= */}
      <section className="section section-music-letter" id="section3">
        {/* البلالين المتطايرة محاذية للطرفين تماماً عشان تبان على الموبايل */}
        {REALISTIC_BALLOON_COLORS.map((color, i) => {
          // توزيع البلالين على الجانب الأيمن والأيسر
          const isLeft = i % 2 === 0;
          const sidePosition = isLeft ? `${2 + i * 4}%` : `${84 - (i - 1) * 3}%`;
          return (
            <RealisticBalloon 
              key={i} 
              color={color}
              style={{
                position: 'absolute',
                left: sidePosition,
                top: `${10 + (i % 3) * 28}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          );
        })}

        <div className="player-and-text-grid">
          {/* مشغل الأغنية ينزلق بسلاسة من الشمال على السكرول */}
          <motion.div 
            className="grid-player-column"
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <YouTubePlayerCard videoId="hICNu-xTBsU" />
          </motion.div>

          {/* رسالة التهنئة تنزلق بسلاسة من اليمين على السكرول */}
          <motion.div 
            className="grid-text-column"
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            <img src="/assets/flork_cake_trans.png" alt="Flork Cake Sticker" className="grid-sticker flork-sticker" />
            <img src="/assets/cupcake_trans.png" alt="Cupcake Sticker" className="grid-sticker cupcake-sticker" />
            <img src="/assets/star_trans.png" alt="Star Patch Sticker" className="grid-sticker star-sticker" />

            <div className="message-content-box">
              <p className="doodle-message-title">Happy Birthday, Ahmed! 🎉</p>
              <p className="doodle-message-body">
                To my best friend and brother for life, happy 23rd birthday! I am so grateful to celebrate another amazing year with you.
              </p>
              <p className="doodle-message-body-expanded">
                Thank you for being the most genuine, loyal, and real brother anyone could ever ask for. Through every gym workout, late-night laugh, and wild adventure, we've built memories that will last a lifetime. May this year bring you unstoppable success, health, happiness, and everything your heart desires! Cheers to many more years of brotherhood! ✨💙🔥
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ===== سيكشن 4: ألبوم الصور (السويبر) ===== */}
      {/* ========================================================= */}
      <section className="section section-photobook-container" id="section4">
        <GarlandArc />
        <PhotoBookSection />
      </section>
    </div>
  );
}
