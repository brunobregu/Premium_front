import Link from 'next/link';
import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import TrackParcel from '../../../pages/trackyourparcel';

export default function Hero1Slider() {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation('common');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(assets/imgs/page/homepage1/banner.png)',
      }}
    >
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
                {t('header')}
              </h1>
              <div className="row">
                <p
                  className="color-white font-md wow animate__animated animate__fadeIn"
                  style={{ textAlign: 'center' }}
                >
                  Track packages from China, US Post, Canada Post, Royal Mail,
                  Deutsche Post,
                  <br className="d-none d-lg-block" />
                  Aliexpress, UPS, Shein, FedEx, Pitney Bowes, eBay, Amazon
                </p>
                <div className="form-trackparcel wow animate__animated animate__fadeIn">
                  <form action="#">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Zip Code"
                      />
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Destination"
                      />
                      <input
                        className="btn btn-brand-1 btn-track"
                        type="submit"
                        defaultValue="Track Package"
                      />
                    </div>
                  </form>
                </div>
                {/* <div className="col-lg-6">
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
              </div> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
