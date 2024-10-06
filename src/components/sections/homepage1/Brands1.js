import Brand1Slider from '@/components/slider/Brand1Slider';
import { useTranslation } from 'react-i18next';

export default function Brands1() {
  const { i18n } = useTranslation();
  return (
    <>
      <div className="section bg-2 pt-65 pb-35">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 mb-30 text-lg-start wow animate__animated animate__fadeIn text-center">
              <p className="font-2xl-bold color-brand-2">
                {i18n.t('we-are-trusted')}
                <span className="color-brand-1">
                  {' '}
                  {i18n.t('we-are-trusted-1')}
                </span>{' '}
                {i18n.t('we-are-trusted-2')}
              </p>
            </div>
            <div className="col-lg-9 mb-30">
              <div className="box-swiper">
                <div className="swiper-container swiper-group-6 pb-0">
                  <Brand1Slider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
