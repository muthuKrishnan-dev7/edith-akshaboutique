import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ad1 from "../../assets/ads/ad1.jpeg";
import ad2 from "../../assets/ads/ad2.jpeg";
import ad3 from "../../assets/ads/ad3.jpeg";
import ad4 from "../../assets/ads/ad4.jpeg";

export default function Hero() {
  let images = [ad1, ad2, ad3, ad4];

  return (
    <div className="rounded-2xl mt-4 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className={`h-[260px] sm:h-[260px] md:h-[300px] lg:h-[380px] w-full object-cover rounded-0xl `}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
