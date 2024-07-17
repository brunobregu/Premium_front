import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import toast, { Toaster } from 'react-hot-toast';
import TransportModal from '../layout/TransportModal';
import premiumApi from '../../util/premiumAPI';

export default function Hero1Slider() {
  const { t } = useTranslation('common');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prices, setPrices] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const destination = 'Albania';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fetchedPrices = await fetchPrices(zipCode, destination);
      setPrices(fetchedPrices);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.detail || 'An error occurred while fetching prices', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async (zipCode, destination) => {
    const response = await premiumApi.get(`/Transportation/price?zip=${zipCode}&terminal=${destination}`);
    return response.data;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPrices(null);
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
                {t('header')}
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
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                      />
                      <input
                        className="form-control"
                        type="text"
                        value={destination}
                        readOnly
                        disabled
                      />
                      <input
                        className="btn btn-brand-1 btn-track"
                        type="submit"
                        value="Track Package"
                      />
                    </div>
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
