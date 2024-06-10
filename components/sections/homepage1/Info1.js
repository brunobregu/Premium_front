import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Info1() {
  const { t } = useTranslation("common");
  return (
    <>
      <section className="section mt-85">
        <div className="container">
          <div className="text-center">
            {/* <img className="mb-15" src="/assets/imgs/template/icons/favicon.svg" alt="transp" /> */}
            <p className="font-md color-grey-700 wow animate__animated animate__fadeIn">
              {t("delivering-results-industry-leaders")}
            </p>
            <h2 className="color-brand-2 mb-65 mt-15 wow animate__animated animate__fadeIn">
              {t("proud-workforce")}
              <br className="d-none d-lg-block" />
              {t("proud-workforce_1")}
            </h2>
          </div>
          <div className="row mt-50 align-items-center">
            <div className="col-xl-7 col-lg-6 mb-30">
              <div className="box-images-pround">
                <div className="box-images wow animate__animated animate__fadeIn">
                  <img
                    className="img-main"
                    src="/assets/imgs/page/homepage1/img1.png"
                    alt="transp"
                  />
                  <div className="image-2 shape-3">
                    <img
                      src="/assets/imgs/page/homepage1/icon1.png"
                      alt="transp"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 mb-30">
              <div className="box-info-pround">
                <h3 className="color-brand-2 mb-15 wow animate__animated animate__fadeIn">
                  {t("fast-shipping-modern-technology")}
                </h3>
                <p className="font-md color-grey-500 wow animate__animated animate__fadeIn">
                  {t("network-expansion")}
                </p>
                <div className="mt-30">
                  <ul className="list-ticks">
                    <li className="wow animate__animated animate__fadeIn">
                      <svg
                        className="w-6 h-6 icon-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t("task-tracking")}
                    </li>
                    <li className="wow animate__animated animate__fadeIn">
                      <svg
                        className="w-6 h-6 icon-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t("task-visualization")}
                    </li>
                    <li className="wow animate__animated animate__fadeIn">
                      <svg
                        className="w-6 h-6 icon-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t("meet-deadlines-faster")}
                    </li>
                    <li className="wow animate__animated animate__fadeIn">
                      <svg
                        className="w-6 h-6 icon-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t("create-task-dependencies")}
                    </li>
                    <li className="wow animate__animated animate__fadeIn">
                      <svg
                        className="w-6 h-6 icon-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t("share-files-discuss")}
                    </li>
                    <li className="wow animate__animated animate__fadeIn">
                      <svg
                        className="w-6 h-6 icon-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t("track-time-spent")}
                    </li>
                  </ul>
                </div>
                {/* <div className="mt-30 text-start d-flex wow animate__animated animate__fadeIn">
                  <Link className="hover-up mr-10" href="#">
                    <img
                      src="/assets/imgs/template/appstore-btn.png"
                      alt="transp"
                    />
                  </Link>
                  <Link className="hover-up" href="#">
                    <img
                      src="/assets/imgs/template/google-play-btn.png"
                      alt="transp"
                    />
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
