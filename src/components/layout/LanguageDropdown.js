"use client"

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '../../store/state';


export default function LanguageDropdown() {
  const router = useRouter();
  const { i18n } = useTranslation();
const {lang, setLang} =useFiltersContext();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  

  const { locale: currentLocale, pathname, asPath, query } = router;
  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && storedLang !== lang) {
      setLang(storedLang);
      i18n.changeLanguage(storedLang);
      router.push({ pathname, query }, asPath, { locale: storedLang });
    }
  }, []);

  function handleLocaleClick(nextLocale) {
      i18n.changeLanguage(nextLocale);
    setLang(nextLocale)
     localStorage.setItem('language', nextLocale);
    router.push({ pathname, query }, asPath, {
      locale: nextLocale
    });
    setIsPopoverOpen(false);
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={"bottom"} // if you'd like, you can limit the positions
      padding={10} // adjust padding here!
      onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
      containerStyle={{ zIndex: 100 }}
      content={() => (
        <div className="dropdown-account">
          <ul>
            <li className="font-md" onClick={() => handleLocaleClick("en")}>
              <img
                src="/assets/imgs/template/icons/en.png"
                alt="transp"
                style={{ marginRight: 10 }}
              />
              {i18n.t("languages.en")}
            </li>
            <li className="font-md" onClick={() => handleLocaleClick("sq")}>
              <img
                src="/assets/imgs/template/icons/al-flag.png"
                alt="transp"
                style={{ marginRight: 10 }}
              />
       {i18n.t("languages.sq")}
            </li>
          </ul>
        </div>
      )}
    >
      <div
        className="d-inline-block box-dropdown-cart"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <span className="font-lg icon-list icon-account">
          <span className="font-sm color-grey-900 arrow-down">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              ></path>
            </svg>
            {i18n.t(`languages.${lang}`)}
          </span>
        </span>
      </div>
    </Popover>
  );
}
