import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import TransportModal from '../modals/TransportModal';
import premiumApi from '../../util/premiumAPI';
import { useTranslation } from 'react-i18next';


export default function Hero1Slider() {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prices, setPrices] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const destination = 'Albania';
  const [locale, setLocale] = useState(i18n.language);
  const [validation, setValidation] = useState("")

  useEffect(() => {
    setLocale(i18n.language);
  }, [i18n.language]);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if(zipCode.length===0) {
      setValidation(i18n.t("zip-code-required"))
      setLoading(false)
      return;
    } else if (zipCode.length>0 && !/^\d+$/.test(zipCode)) {
      setLoading(false)
      setValidation(i18n.t("zip-code-number"))
      return;
    }
    try {
      const fetchedPrices = await fetchPrices(locale, zipCode, destination);
      if(fetchedPrices ){
        setPrices(fetchedPrices);
        setIsModalOpen(true);
        setValidation('')
      } else {
        setLoading(false);
        setValidation(i18n.t("zip-exist"))
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.detail || 'An error occurred while fetching prices', {
        position: 'top-right',
      });
      setValidation(error.response?.data?.detail || 'An error occurred while fetching prices')
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async (locale, zipCode, destination) => {
    try {
      const response = await premiumApi.get(`/${locale}/Transportation/price`, {
        params: {
          zip: zipCode,
          terminal: destination
        }
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error, try againg', { position: "top-right" });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPrices(null);
    setValidation('')
    
  };


  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
setValidation('')
  };


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(assets/imgs/page/homepage1/banner.png)',
      }}
    >
      <div className="banner-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1 className="color-main mb-15 wow animate__animated animate__fadeIn">
                Premium Logistics
              </h1>
              <p
                className="font-md color-white mb-15 wow animate__animated animate__fadeIn"
                data-wow-delay=".0s"
              >
                Logistics &amp; Transportation
              </p>
              <h1
                className="color-white mb-25 wow animate__animated animate__fadeInUp"
                data-wow-delay=".0s"
              >
                {i18n.t('header')}
              </h1>
              <div className="row">
                <p
                  className="color-white font-md wow animate__animated animate__fadeIn"
                  style={{ textAlign: 'center' }}
                >
                  Track packages from China, US Post, Canada Post, Royal Mail,
                  Deutsche Post,
                  <br className="d-none d-lg-block" />
                  Aliexpress, UPS, Shein, FedEx, Pitney Bowes, eBay, Amazon
                </p>
                <div className="form-trackparcel wow animate__animated animate__fadeIn">
                  <form onSubmit={handleSubmit}>
                  <div className='responsive-div'>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={handleZipCodeChange}
                      />
                      <input
                        className="form-control"
                        type="text"
                        value={destination}
                        readOnly
                        disabled
                      />
                      <input
                      disabled={loading}
                        className= {` ${loading ? "opacity-50":""} btn btn-brand-1 btn-track`}
                        type="submit"
                        value="Calculate shipping"
                      />
                    </div>
                    <p className='text-red-600' style={{color:"red"}}> {validation}</p>
                  </form>
                  <TransportModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    zipCode={zipCode}
                    destination={destination}
                    prices={prices}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

