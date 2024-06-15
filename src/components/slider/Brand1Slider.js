import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

export default function Brand1Slider() {
  return (
    <>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-banner",
        }}
        navigation={{
          prevEl: ".swiper-button-prev-customers",
          nextEl: ".swiper-button-next-customers",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="swiper-wrapper wow animate__animated animate__fadeIn"
      >
        <SwiperSlide>
          <img src="/assets/imgs/slider/logo/maersk.png" alt="transp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/imgs/slider/logo/hapag_lloyd.png" alt="transp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/imgs/slider/logo/cig.png" alt="transp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/imgs/slider/logo/zim.png" alt="transp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/imgs/slider/logo/cosco.png" alt="transp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/imgs/slider/logo/msc_1.png" alt="transp" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
