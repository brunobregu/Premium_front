import Testimonial1Slider from "@/components/slider/Testimonial1Slider";
import { useTranslation } from 'react-i18next';

export default function Testimonial1() {
  const {  i18n } = useTranslation();
  return (
    <>
      <section className="section mt-50 bg-customers-say">
        <div className="container">
          <h2 className="color-white mb-20 title-padding-left wow animate__animated animate__fadeIn">
            {i18n.t("what-customers-saying")}
          </h2>
          <p className="font-lg color-white pl-55 wow animate__animated animate__fadeIn">
            {i18n.t("hear-from-customers")}
            <br className="d-none d-lg-block" />
            {i18n.t("hear-from-customers_1")}
          </p>
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
