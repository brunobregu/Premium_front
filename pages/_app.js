import "../public/assets/css/style.css";

import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp /*, nextI18NextConfig */);
