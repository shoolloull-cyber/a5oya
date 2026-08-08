import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

// ===== ألبوم الصور (السويبر اللي بتقلب فيه بالتاتش) =====
// غير الصور والكلام من هنا
export default function PhotoBookSection() {

  // ---- قائمة الصور والكلام بتاع كل صورة ----
  // كل صورة ليها: image (مسار الصورة) و caption (العنوان) و sub (الوصف)
  // الصور موجودة في مجلد: public/assets/gallery/
  // لو عايز تزود صورة: حط الصورة في المجلد وزود object جديد في الليست
  // لو عايز تشيل صورة: امسح الobject بتاعها
  const memories = [
    {
      id: 1,
      image: '/assets/gallery/photo1.jpg',    // غير مسار الصورة هنا
      caption: 'Brothers in Action 📸',         // غير العنوان هنا
      sub: 'Capturing unforgettable moments together'  // غير الوصف هنا
    },
    {
      id: 2,
      image: '/assets/gallery/photo2.jpg',
      caption: 'Gym & Discipline 💪',
      sub: 'Pushing each other to be real champions'
    },
    {
      id: 3,
      image: '/assets/gallery/photo3.jpg',
      caption: 'Night Laughs & Good Times 😊',
      sub: 'Pure joy and genuine brotherhood'
    },
    {
      id: 4,
      image: '/assets/gallery/photo4.jpg',
      caption: 'Great Days Out 🌊',
      sub: 'Adventures we will always cherish'
    },
    {
      id: 5,
      image: '/assets/gallery/photo5.jpg',
      caption: 'Celebrations & Milestones 🎉',
      sub: 'Here is to a lifetime of success and friendship!'
    }
  ];

  return (
    <div className="photobook-inner-wrapper" id="section-photobook">
      {/* ---- عنوان سيكشن الصور (غير الكلام هنا) ---- */}
      <h2 className="photobook-title">Brotherhood Gallery 📸✨</h2>
      <p className="photobook-subtitle">Swipe through our favorite memories together</p>

      {/* السويبر - مش محتاج تغير حاجة هنا */}
      <div className="swiper-cards-wrapper">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay, Pagination]}
          autoplay={{
            delay: 3500,       // وقت الانتظار بين كل صورة (بالميلي ثانية) - غيره لو عايز أسرع أو أبطأ
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="touchCardsSwiper"
        >
          {memories.map((item) => (
            <SwiperSlide key={item.id} className="clean-touch-slide">
              <div className="clean-polaroid-card">
                {/* الصورة */}
                <div className="clean-img-box">
                  <img src={item.image} alt={item.caption} className="clean-img" />
                </div>

                {/* الكلام تحت الصورة */}
                <div className="clean-caption-area">
                  <p className="clean-caption">{item.caption}</p>
                  <p className="clean-sub">{item.sub}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
