import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HandwrittenText from './HandwrittenText';
import GarlandArc from './GarlandArc';
import YouTubePlayerCard from './YouTubePlayerCard';
import PhotoBookSection from './PhotoBookSection';
import StarWaveDivider from './StarWaveDivider';
import confetti from 'canvas-confetti';

// ===== ألوان البلالين المتطايرة في سيكشن الأغنية =====
// غير الألوان هنا لو عايز ألوان تانية
const REALISTIC_BALLOON_COLORS = ['#ff6b8a', '#ffdd67', '#7ecbff', '#c88fff', '#ff9a5c', '#a8e6cf'];

// ===== شكل البالونة الواحدة (مش محتاج تغير حاجة هنا) =====
function RealisticBalloon({ color, style }) {
  return (
    <div className="realistic-floating-balloon" style={style}>
      <svg width="52" height="70" viewBox="0 0 52 70">
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

// ===== السيكشن الرئيسي اللي فيه كل حاجة بعد الجواب =====
export default function CelebrationSection({ isVisible }) {
  useEffect(() => {
    if (isVisible) {
      // انفجار خفيف لما السيكشن يظهر (مش هيعلق)
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ffdd67', '#ffffff', '#ff85a1', '#7ecbff'],
        disableForReducedMotion: true,
      });
    }
  }, [isVisible]);

  return (
    <div className="celebration-full-flow">

      {/* ========================================================= */}
      {/* ===== سيكشن 2: صورة الشخص بين الرقمين (العمر) ===== */}
      {/* لون الخلفية: #4C6190 (اتغيره من ملف index.css) */}
      {/* ========================================================= */}
      <section className="section section-birthday" id="section2">
        {/* زينة النجوم في السقف */}
        <GarlandArc />

        {/* صور باقات البلالين على الجانبين */}
        {/* الصورة موجودة في: public/assets/balloon_bouquet_trans.png */}
        <div className="floating-balloon-bouquet left-bouquet">
          <img src="/assets/balloon_bouquet_trans.png" alt="Balloon Bouquet Left" className="balloon-bouquet-img" />
        </div>
        <div className="floating-balloon-bouquet right-bouquet">
          <img src="/assets/balloon_bouquet_trans.png" alt="Balloon Bouquet Right" className="balloon-bouquet-img" />
        </div>

        {/* ---- صورة الشخص بين الرقمين (العمر) ---- */}
        {/* غير الصورة من: public/assets/boy_23_trans.png */}
        {/* حط الصورة الجديدة في نفس المجلد بنفس الاسم أو غير الاسم هنا */}
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
        {/* غير النص هنا */}
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
      {/* لون الخلفية: #334366 (اتغيره من ملف index.css) */}
      {/* ========================================================= */}
      <section className="section section-music-letter" id="section3">
        {/* بلالين متطايرة في السيكشن ده بس */}
        {REALISTIC_BALLOON_COLORS.map((color, i) => (
          <RealisticBalloon 
            key={i} 
            color={color}
            style={{
              position: 'absolute',
              left: `${8 + i * 16}%`,
              top: `${12 + (i % 3) * 22}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        <motion.div 
          className="player-and-text-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* ---- مشغل الأغنية (يوتيوب) ---- */}
          {/* غير كود الأغنية من هنا: videoId */}
          {/* الكود هو اللي بعد v= في لينك اليوتيوب */}
          {/* مثال: https://youtu.be/hICNu-xTBsU يبقى الكود هو hICNu-xTBsU */}
          <div className="grid-player-column">
            <YouTubePlayerCard videoId="hICNu-xTBsU" />
          </div>

          {/* ---- رسالة التهنئة الإنجليزية ---- */}
          <div className="grid-text-column">
            {/* استيكر الفلورك (شخصية بتمسك كيكة) */}
            {/* الصورة في: public/assets/flork_cake_trans.png */}
            <img src="/assets/flork_cake_trans.png" alt="Flork Cake Sticker" className="grid-sticker flork-sticker" />
            {/* استيكر الكب كيك */}
            {/* الصورة في: public/assets/cupcake_trans.png */}
            <img src="/assets/cupcake_trans.png" alt="Cupcake Sticker" className="grid-sticker cupcake-sticker" />
            {/* استيكر النجمة */}
            {/* الصورة في: public/assets/star_trans.png */}
            <img src="/assets/star_trans.png" alt="Star Patch Sticker" className="grid-sticker star-sticker" />

            <div className="message-content-box">
              {/* ---- عنوان الرسالة (غير الاسم والكلام هنا) ---- */}
              <p className="doodle-message-title">Happy Birthday, Ahmed! 🎉</p>
              
              {/* ---- السطر الأول من الرسالة ---- */}
              <p className="doodle-message-body">
                To my best friend and brother for life, happy 23rd birthday! I am so grateful to celebrate another amazing year with you.
              </p>
              
              {/* ---- السطر التاني من الرسالة (بالأصفر) ---- */}
              <p className="doodle-message-body-expanded">
                Thank you for being the most genuine, loyal, and real brother anyone could ever ask for. Through every gym workout, late-night laugh, and wild adventure, we've built memories that will last a lifetime. May this year bring you unstoppable success, health, happiness, and everything your heart desires! Cheers to many more years of brotherhood! ✨💙🔥
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* ===== سيكشن 4: ألبوم الصور (السويبر) ===== */}
      {/* لون الخلفية: #1F2942 (اتغيره من ملف index.css) */}
      {/* الصور في مجلد: public/assets/gallery/ */}
      {/* ========================================================= */}
      <section className="section section-photobook-container" id="section4">
        {/* زينة النجوم في السقف */}
        <GarlandArc />

        {/* ألبوم الصور - غير الصور والكلام من ملف PhotoBookSection.jsx */}
        <PhotoBookSection />
      </section>
    </div>
  );
}
