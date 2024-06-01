import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import TrackParcel from "@/pages/trackyourparcel";
import TrackingCard from "../../components/elements/TrackingCard";

export default function Hero1Slider() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: "url(assets/imgs/page/homepage1/banner.png)",
        }}
      >
        <TrackingCard />

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          loop={false}
          // autoplay={{
          //   delay: 5500,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-banner",
          }}
          className="swiper-wrapper"
        >
          <SwiperSlide>
            <div className="banner-1">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <h1 className="color-main mb-15 wow animate__animated animate__fadeIn">
                      Premium Logistics
                    </h1>
                    <p
                      className="font-md color-white mb-15 wow animate__animated animate__fadeIn"
                      data-wow-delay=".0s"
                    >
                      Logistics &amp; Transportation
                    </p>
                    <h1
                      className="color-white mb-25 wow animate__animated animate__fadeInUp"
                      data-wow-delay=".0s"
                    >
                      Your Global Shipping Partner
                    </h1>
                    <div className="row">
                      <div className="col-lg-6">
                        <p
                          className="font-md color-white mb-20 wow animate__animated animate__fadeInUp"
                          data-wow-delay=".0s"
                        >
                          Welcome to Premium Logistics, your trusted partner for
                          reliable and efficient shipping services. With our
                          extensive network and expertise, we provide seamless
                          shipping solutions from anywhere in the world to
                          Albania and beyond. Whether you're shipping packages,
                          parcels, or freight, we ensure safe and timely
                          delivery, every time. Experience the convenience and
                          reliability of Premium Logistics for all your shipping
                          needs."
                        </p>
                      </div>
                    </div>
                    {/* <div className="box-button mt-30">
                    <Link
                      className="btn btn-brand-1-big hover-up mr-40 wow animate__animated animate__fadeInUp"
                      href="#"
                    >
                      Calculate Package
                    </Link>
                    <a
                      className="btn btn-play popup-youtube hover-up wow animate__animated animate__fadeInUp"
                      onClick={() => setOpen(true)}
                    >
                      <img
                        className="wow animate__animated animate__fadeInUp"
                        src="/assets/imgs/template/icons/play.svg"
                        alt=""
                      />
                      How it work ?
                    </a>
                  </div> */}
                  </div>
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId="vfhzo499OeA"
                    onClose={() => setOpen(false)}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="banner-1"
              style={{
                backgroundImage: "url(assets/imgs/page/homepage1/banner-2.png)",
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <p
                      className="font-md color-white mb-15 wow animate__animated animate__fadeInUp"
                      data-wow-delay=".0s"
                    >
                      Logistics &amp; Transportation
                    </p>
                    <h1
                      className="color-white mb-25 wow animate__animated animate__fadeInUp"
                      data-wow-delay=".0s"
                    >
                      Digital &amp; Trusted Transport
                      <br className="d-none d-lg-block" />
                      Logistic Company
                    </h1>
                    <div className="row">
                      <div className="col-lg-6">
                        <p
                          className="font-md color-white mb-20 wow animate__animated animate__fadeInUp"
                          data-wow-delay=".0s"
                        >
                          Our experienced team of problem solvers and a
                          commitment to always align with our client’s business
                          goals and objectives is what drives mutual success.
                        </p>
                      </div>
                    </div>
                    {/* <div className="box-button mt-30">
                    <Link
                      className="btn btn-brand-1-big hover-up mr-40 wow animate__animated animate__fadeInUp"
                      href="#"
                    >
                      Calculate Package
                    </Link>
                    <a
                      className="btn btn-play popup-youtube hover-up wow animate__animated animate__fadeInUp"
                      onClick={() => setOpen(true)}
                    >
                      <img
                        className="wow animate__animated animate__fadeInUp"
                        src="/assets/imgs/template/icons/play.svg"
                        alt=""
                      />
                      How it work ?
                    </a>
                  </div> */}
                  </div>
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId="vfhzo499OeA"
                    onClose={() => setOpen(false)}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-pagination swiper-pagination-banner" />
      </div>
    </>
  );
}
