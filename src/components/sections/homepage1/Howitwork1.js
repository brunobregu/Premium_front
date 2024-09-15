import { useTranslation } from 'react-i18next';

export default function Howitwork1() {
  const { i18n } = useTranslation();
  return (
    <>
      <section className="section pt-85 bg-worldmap">
        <div className="container">
          <div className="text-center">
            {/* <img
              className="mb-15"
              src="/assets/imgs/template/icons/favicon.svg"
              alt="transp"
            /> */}
            <h2 className="color-brand-2 wow animate__animated animate__fadeIn mb-20">
              {i18n.t('how-it-works')}
            </h2>
            <p className="font-md color-grey-700 wow animate__animated animate__fadeIn">
              {i18n.t('how-it-works-description')}
            </p>
          </div>
          <div className="row mt-50">
            <div className="col-lg-6 mb-30">
              <div className="box-image-how">
                <img
                  className="w-100 wow animate__animated animate__fadeIn"
                  src="/assets/imgs/page/homepage1/how-it-work.png"
                  alt="transp"
                />
                <div className="box-info-bottom-img">
                  <div className="image-play">
                    {/* <img
                      className="mb-15 wow animate__animated animate__fadeIn"
                      src="/assets/imgs/template/icons/play.svg"
                      alt="transp"
                    /> */}
                  </div>
                  {/* <div className="info-play">
                    <h4 className="color-white mb-15 wow animate__animated animate__fadeIn">
                      {i18n.t("25-years-experience")}
                    </h4>
                    <p className="font-sm color-white wow animate__animated animate__fadeIn">
                      {i18n.t("experience-description")}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-30">
              <ul className="list-how-works">
                <li>
                  <div className="image-how">
                    <span className="img">
                      <img
                        src="/assets/imgs/page/homepage1/order.png"
                        alt="transp"
                      />
                    </span>
                  </div>
                  <div className="info-how">
                    <h5 className="color-brand-2 wow animate__animated animate__fadeIn">
                      {i18n.t('customer-places-order')}
                    </h5>
                    <p className="font-md color-grey-700 wow animate__animated animate__fadeIn">
                      {i18n.t('inspection-quality-check')}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="image-how">
                    <span className="img">
                      <img
                        src="/assets/imgs/page/homepage1/payment.png"
                        alt="transp"
                      />
                    </span>
                  </div>
                  <div className="info-how">
                    <h5 className="color-brand-2 wow animate__animated animate__fadeIn">
                      {i18n.t('payment-successful')}
                    </h5>
                    <p className="font-md color-grey-700 wow animate__animated animate__fadeIn">
                      {i18n.t('payment-methods')}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="image-how">
                    <span className="img">
                      <img
                        src="/assets/imgs/page/homepage1/warehouse.png"
                        alt="transp"
                      />
                    </span>
                  </div>
                  <div className="info-how">
                    <h5 className="color-brand-2 wow animate__animated animate__fadeIn">
                      {i18n.t('warehouse-receives-order')}
                    </h5>
                    <p className="font-md color-grey-700 wow animate__animated animate__fadeIn">
                      {i18n.t('check-accuracy')}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="image-how">
                    <span className="img">
                      <img
                        src="/assets/imgs/page/homepage1/picked.png"
                        alt="transp"
                      />
                    </span>
                  </div>
                  <div className="info-how">
                    <h5 className="color-brand-2 wow animate__animated animate__fadeIn">
                      {i18n.t('item-picked-packed-shipped')}
                    </h5>
                    <p className="font-md color-grey-700 wow animate__animated animate__fadeIn">
                      {i18n.t('ship-local-carrier')}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="image-how">
                    <span className="img">
                      <img
                        src="/assets/imgs/page/homepage1/delivery.png"
                        alt="transp"
                      />
                    </span>
                  </div>
                  <div className="info-how">
                    <h5 className="color-brand-2 wow animate__animated animate__fadeIn">
                      {i18n.t('delivered-measure-success')}
                    </h5>
                    <p className="font-md color-grey-700 wow animate__animated animate__fadeIn">
                      {i18n.t('update-order-status')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
