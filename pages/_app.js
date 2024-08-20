import "../public/assets/css/style.css";
import '../i18'; // Import the i18n configuration
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

import { appWithTranslation } from "next-i18next";
import { FiltersProvider } from '../src/store/state';
import { useRouter } from 'next/router';
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    if (router.locale) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);
  return(
    <FiltersProvider>
    <Component {...pageProps} />;
    </FiltersProvider>)
}

export default appWithTranslation(MyApp /*, nextI18NextConfig */);
