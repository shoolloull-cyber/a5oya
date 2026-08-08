import React from 'react';
import { motion } from 'framer-motion';

// ===== سيكشن الجواب (الشاشة الأولى) =====
// غير الكلام اللي فوق الجواب وتحته من هنا
export default function EnvelopeSection({ onOpen }) {
  return (
    <section className="section section-envelope">
      {/* ---- الكلام اللي فوق الجواب ---- */}
      {/* غير الاسم هنا */}
      <motion.h1 
        className="doodle-title-top"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hey Ahmed!
      </motion.h1>

      {/* ---- صورة الجواب المتحرك (اضغط عليه يروح السيكشن التاني) ---- */}
      <motion.div 
        className="envelope-wrapper"
        onClick={onOpen}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* صورة الجواب موجودة في: public/assets/envelope_trans.png */}
        <img 
          src="/assets/envelope_trans.png" 
          alt="Birthday Envelope" 
          className="envelope-img"
        />
      </motion.div>

      {/* ---- الكلام اللي تحت الجواب ---- */}
      {/* غير الرسالة هنا */}
      <motion.h2 
        className="doodle-title-bottom"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        i have a message for you my brother 💙
      </motion.h2>
    </section>
  );
}
