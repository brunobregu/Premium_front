import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

export default function Menu() {
  const { i18n } = useTranslation();
  const router = useRouter();

  return (
    <>
      <ul className="main-menu">
        <li>
          <Link className="active" href="/">
            {i18n.t('home')}
          </Link>
          {/* <ul className="sub-menu">
            <li>
              <Link href="/">Homepage - 1</Link>
            </li>
            <li>
              <Link href="/index-2">Homepage - 2</Link>
            </li>
            <li>
              <Link href="/index-3">Homepage - 3</Link>
            </li>
            <li>
              <Link href="/index-4">Homepage - 4</Link>
            </li>
          </ul> */}
        </li>
        <li>
          <Link href="/about"> {i18n.t('about-us')}</Link>
        </li>
        {/* <li className="has-children">
          <Link href="#">{i18n.t('services')}</Link>
          <div className="sub-menu five-col">
            <div className="menu-col">
              <h6 className="color-brand-2 mb-15">Sea Forwarding</h6>
              <div className="menu-image">
                <img src="/assets/imgs/page/homepage1/menu1.png" alt="transp" />
              </div>
              <ul className="megamenu">
                <li>
                  <Link href="/services">Container Shipping</Link>
                </li>
                <li>
                  <Link href="/services">Bulk Shipping</Link>
                </li>
                <li>
                  <Link href="/services">Roll-on/Roll-off Shipping</Link>
                </li>
                <li>
                  <Link href="/services">Break Bulk Shipping</Link>
                </li>
                <li>
                  <Link href="/services">Project Cargo Shipping</Link>
                </li>
              </ul>
            </div>
            <div className="menu-col">
              <h6 className="color-brand-2 mb-15">Air Freight Forwarding</h6>
              <div className="menu-image">
                <img src="/assets/imgs/page/homepage1/menu2.png" alt="transp" />
              </div>
              <ul className="megamenu">
                <li>
                  <Link href="/services">General Cargo</Link>
                </li>
                <li>
                  <Link href="/services">Express Shipping</Link>
                </li>
                <li>
                  <Link href="/services">Dangerous Goods</Link>
                </li>
                <li>
                  <Link href="/services">Oversized Cargo</Link>
                </li>
                <li>
                  <Link href="/services">Perishable Goods</Link>
                </li>
              </ul>
            </div>
            <div className="menu-col">
              <h6 className="color-brand-2 mb-15">Land Transportation</h6>
              <div className="menu-image">
                <img src="/assets/imgs/page/homepage1/menu3.png" alt="transp" />
              </div>
              <ul className="megamenu">
                <li>
                  <Link href="/services">Road Freight</Link>
                </li>
                <li>
                  <Link href="/services">Rail Freight</Link>
                </li>
                <li>
                  <Link href="/services">Intermodal Transportation</Link>
                </li>
                <li>
                  <Link href="/services">
                    Less-than-Truckload (LTL) Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/services">Specialized Transportation</Link>
                </li>
              </ul>
            </div>
            <div className="menu-col">
              <h6 className="color-brand-2 mb-15">Railway Logistics</h6>
              <div className="menu-image">
                <img src="/assets/imgs/page/homepage1/menu4.png" alt="transp" />
              </div>
              <ul className="megamenu">
                <li>
                  <Link href="/services">Rail Freight Transportation</Link>
                </li>
                <li>
                  <Link href="/services">Rail Terminal Services</Link>
                </li>
                <li>
                  <Link href="/services">Rail Freight Forwarding</Link>
                </li>
                <li>
                  <Link href="/services">Intermodal Transportation</Link>
                </li>
                <li>
                  <Link href="/services">Rail Logistics Consulting</Link>
                </li>
              </ul>
            </div>
            <div className="menu-col">
              <h6 className="color-brand-2 mb-15">Warehouse</h6>
              <div className="menu-image">
                <img src="/assets/imgs/page/homepage1/menu5.png" alt="transp" />
              </div>
              <ul className="megamenu">
                <li>
                  <Link href="/services">Warehousing</Link>
                </li>
                <li>
                  <Link href="/services">Distribution Center Operations</Link>
                </li>
                <li>
                  <Link href="/services">E-Commerce Fulfillment</Link>
                </li>
                <li>
                  <Link href="/services">Reverse Logistics</Link>
                </li>
                <li>
                  <Link href="/services">Inventory Management</Link>
                </li>
              </ul>
            </div>
          </div>
        </li> */}
        <li className="has-children">
          <Link href="#">{i18n.t('pages')}</Link>
          <ul className="sub-menu">
            <li>
              <Link href="/service-detail">{i18n.t('service-detail')}</Link>
            </li>
            {/* <li>
              <Link href="/trackyourparcel">{i18n.t("track-your-parcel")}</Link>
            </li> */}
            <li>
              <Link href="/workprocess">{i18n.t('work-process')}</Link>
            </li>
            <li>
              <Link href="/request-a-quote">{i18n.t('request-a-quote')}</Link>
            </li>
            <li>
              <Link href="/our-team">{i18n.t('our-team')}</Link>
            </li>
            <li>
              <Link href="/faqs">{i18n.t('faq')}</Link>
            </li>
            <li>
              <Link href="/register">{i18n.t('register')}</Link>
            </li>
            <li>
              <Link href="/login">{i18n.t('login')}</Link>
            </li>
            {/* <li>
              <Link href="/comingsoon">Coming soon</Link>
            </li> */}
            {/* <li>
              <Link href="/newsletter">Newsletter</Link>
            </li>
            <li>
              <Link href="/404">Error 404</Link>
            </li> */}
          </ul>
        </li>
        {/* <li className="has-children">
          <Link href="/blog">Blog</Link>
          <ul className="sub-menu">
            <li>
              <Link href="/blog-single">Blog Details</Link>
            </li>
          </ul>
        </li> */}
        <li>
          <Link href="/contact">{i18n.t('contact')}</Link>
        </li>
      </ul>
    </>
  );
}
