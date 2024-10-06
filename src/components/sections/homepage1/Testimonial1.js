import Testimonial1Slider from '@/components/slider/Testimonial1Slider';
import { useTranslation } from 'react-i18next';

export default function Testimonial1() {
  const { i18n } = useTranslation();
  return (
    <>
      <section className="section mt-50 bg-customers-say">
        <div className="container">
          <h2 className="color-white title-padding-left wow animate__animated animate__fadeIn mb-20">
            {i18n.t('what-customers-saying')}
          </h2>
        </div>
        <div className="container">
          <div className="box-slide-customers mt-50">
            <div className="box-swiper">
              <div className="swiper-container swiper-group-3-customers pb-50">
                <Testimonial1Slider />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
