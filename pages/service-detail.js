import Layout from '@/components/layout/Layout';
import Pricing2 from '@/components/sections/homepage2/Pricing2';
import ServiceSlider from '@/components/slider/ServiceSlider';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
export default function ServiceDetail() {
  const { i18n } = useTranslation();
  return (
    <>
      <Layout>
        <section className="section">
          <div className="container">
            <div className="box-pageheader-1 box-pageheader-services text-center">
              <span className="btn btn-tag wow animate__animated animate__fadeIn">
                {i18n.t('our-services')}
              </span>
              <h2 className="color-brand-2 mt-15 wow animate__animated animate__fadeIn mb-10">
                {i18n.t('sea-forwarding')}
              </h2>
              <p className="font-md color-grey-900 wow animate__animated animate__fadeIn">
                Transp’s roots are in Sea Freight! Whether it’s full containers,
                consolidations, roll-on/roll-
                <br className="d-none d-lg-block" />
                off equipment or entire projects, moving shipments by sea is our
                “flagship” service.
              </p>
            </div>
          </div>
        </section>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 wow animate__animated animate__fadeIn">
                <img
                  src="/assets/imgs/page/service-detail/img1.png"
                  alt="transp"
                />
              </div>
              <div className="col-lg-6 position-relative wow animate__animated animate__fadeIn">
                <img
                  src="/assets/imgs/page/service-detail/img2.png"
                  alt="transp"
                />
                <div className="quote-center shape-2" />
              </div>
            </div>
          </div>
        </div>
        <section className="section mt-50">
          <div className="container">
            <div className="content-detail">
              <strong className="font-md-bold color-grey-900 mb-25 d-block wow animate__animated animate__fadeIn">
                Sea freight forwarding, also known as ocean freight forwarding,
                is a critical aspect of the global supply chain. It refers to
                the transportation of goods via cargo ships or vessels from one
                port to another. This mode of transportation is preferred by
                many businesses due to its cost-effectiveness, reliability, and
                ability to transport large quantities of goods. In this article,
                we will discuss the basics of sea freight forwarding, including
                its benefits, modes of transportation, and key players.
              </strong>
              <h3 className="color-brand-2 wow animate__animated animate__fadeIn">
                Modes of Sea Freight Transportation
              </h3>
              <p className="font-md color-grey-900 wow animate__animated animate__fadeIn">
                There are two primary modes of sea freight transportation: Full
                Container Load (FCL) and Less than Container Load (LCL). FCL is
                used when the shipment is large enough to fill="none" an entire
                container. On the other hand, LCL is used when the shipment does
                not require a full container. In this case, the goods are
                combined with other shipments to fill="none" a container. Both
                modes have their advantages and disadvantages.
              </p>
              <p className="wow animate__animated animate__fadeIn">
                <img
                  src="/assets/imgs/page/service-detail/img3.png"
                  alt="transp"
                />
              </p>
              <p className="wow animate__animated animate__fadeIn">
                There are two primary modes of sea freight transportation: Full
                Container Load (FCL) and Less than Container Load (LCL). FCL is
                used when the shipment is large enough to fill="none" an entire
                container. On the other hand, LCL is used when the shipment does
                not require a full container. In this case, the goods are
                combined with other shipments to fill="none" a container. Both
                modes have their advantages and disadvantages.
              </p>
              <p className="wow animate__animated animate__fadeIn">
                There are two primary modes of sea freight transportation: Full
                Container Load (FCL) and Less than Container Load (LCL). FCL is
                used when the shipment is large enough to fill="none" an entire
                container. On the other hand, LCL is used when the shipment does
                not require a full container. In this case, the goods are
                combined with other shipments to fill="none" a container. Both
                modes have their advantages and disadvantages.
              </p>
              <h3 className="wow animate__animated animate__fadeIn">
                Benefits of Sea Freight Forwarding
              </h3>
              <div className="row align-items-center">
                <div className="col-lg-7 wow animate__animated animate__fadeIn">
                  <p>
                    Sea freight forwarding offers several benefits to businesses
                    that use it to transport their goods. Some of the benefits
                    include:
                  </p>
                  <p>
                    Cost-Effectiveness: Sea freight forwarding is one of the
                    most cost-effective modes of transportation, especially for
                    businesses that require the transportation of large
                    quantities of goods. This is because cargo ships can
                    transport large volumes of goods at a lower cost compared to
                    other modes of transportation.
                  </p>
                  <p>
                    Sea freight forwarding is a reliable mode of transportation
                    since it is not affected by traffic or weather conditions.
                    Additionally, cargo ships are designed to withstand harsh
                    weather conditions, which reduces the risk of damage or loss
                    of goods.
                  </p>
                </div>
                <div className="col-lg-5 wow animate__animated animate__fadeIn">
                  <img
                    src="/assets/imgs/page/service-detail/img4.png"
                    alt="transp"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-50" />

        <div className="line-border" />
        {/* <section className="section pt-50 mb-80 pb-5">
          <div className="container">
            <div className="text-center">
              <h2 className="color-brand-2 mb-15 wow animate__animated animate__fadeIn">
                Other Services
              </h2>
              <p className="font-md color-grey-700 mb-35 wow animate__animated animate__fadeIn">
                You choose the cities where you’d like to deliver. All
                deliveries are within a specific service area
                <br className="d-none d-lg-block" />
                and delivery services vary by location. Whatever the mode or
                requirement, we will find and book
                <br className="d-none d-lg-block" />
                the ideal expedited shipping solution to ensure a timely
                delivery.
              </p>
            </div>
            <div className="box-slider-homepage2 box-slider-homepage-4 box-slider-service-4">
              <div className="container">
                <div className="box-swiper">
                  <ServiceSlider />
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <div className="section bg-map d-block">
          <div className="container">
            <div className="box-newsletter">
              <h3 className="color-brand-2 wow animate__animated animate__fadeIn mb-20">
                Get in Touch
              </h3>
              <div className="row">
                <div className="col-lg-5 mb-30">
                  <div className="form-newsletter wow animate__animated animate__fadeIn">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Your name *"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Your email *"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Weight"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Height"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Message / Note"
                              rows={5}
                              defaultValue={''}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <input
                            className="btn btn-brand-1-big"
                            type="submit"
                            defaultValue="Submit Now"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-7 mb-30">
                  <div className="d-flex box-newsletter-right">
                    <div className="box-map-2 wow animate__animated animate__fadeIn">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.960389549842!2d-83.76408938441998!3d37.15364135542302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884352a00e70879f%3A0x1ad06ed33b7003c!2sIangar!5e0!3m2!1svi!2s!4v1678013229780!5m2!1svi!2s"
                        height={242}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <ul className="list-info-footer">
                      <li className="wow animate__animated animate__fadeIn">
                        <div className="cardImage">
                          <span className="icon-brand-1">
                            <img
                              src="/assets/imgs/page/homepage2/address.svg"
                              alt="transp"
                            />
                          </span>
                        </div>
                        <div className="cardInfo">
                          <h6 className="font-sm-bold color-grey-900">
                            Address
                          </h6>
                          <p className="font-sm color-grey-900">
                            65 Allerton Street 901 N Pitt Str, USA
                          </p>
                        </div>
                      </li>
                      <li className="wow animate__animated animate__fadeIn">
                        <div className="cardImage">
                          <span className="icon-brand-1">
                            <img
                              src="/assets/imgs/page/homepage2/email.svg"
                              alt="transp"
                            />
                          </span>
                        </div>
                        <div className="cardInfo">
                          <h6 className="font-sm-bold color-grey-900">Email</h6>
                          <p className="font-sm color-grey-900">
                            contact@transp.com
                          </p>
                        </div>
                      </li>
                      <li className="wow animate__animated animate__fadeIn">
                        <div className="cardImage">
                          <span className="icon-brand-1">
                            <img
                              src="/assets/imgs/page/homepage2/phone.svg"
                              alt="transp"
                            />
                          </span>
                        </div>
                        <div className="cardInfo">
                          <h6 className="font-sm-bold color-grey-900">
                            Telephone
                          </h6>
                          <p className="font-sm color-grey-900">
                            (+380) 50 318 47 07 - (+182) 50 318 47 07
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Layout>
    </>
  );
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
