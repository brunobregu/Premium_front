import "../public/assets/css/style.css";
import '../i18'; // Import the i18n configuration
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

import { appWithTranslation } from "next-i18next";
import { FiltersProvider } from '../src/store/state';

function MyApp({ Component, pageProps }) {
  return(
    <FiltersProvider>
    <Component {...pageProps} />;
    </FiltersProvider>)
}

export default appWithTranslation(MyApp /*, nextI18NextConfig */);
