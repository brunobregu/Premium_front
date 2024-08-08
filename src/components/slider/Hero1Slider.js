import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import toast, { Toaster } from 'react-hot-toast';
import TransportModal from '../modals/TransportModal';
import premiumApi from '../../util/premiumAPI';

export default function Hero1Slider() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prices, setPrices] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const destination = 'Albania';
  const { t, i18n } = useTranslation('common');
  const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    setLocale(i18n.language);
  }, [i18n.language]);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const fetchedPrices = await fetchPrices(locale, zipCode, destination);
      if(fetchedPrices ){
        setPrices(fetchedPrices);
        setIsModalOpen(true);
      } else {
        setLoading(false);
        toast.error(error.response?.data?.detail || 'An error occurred while fetching prices', {
          position: 'top-right',
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.detail || 'An error occurred while fetching prices', {
        position: 'top-right',
      });
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
      console.error('API call failed:', error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPrices(null);
  };

  // const [file, setFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (!file) {
  //     alert('Please select a file first.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('File', file);

  //   try {
  //     const response = await fetch('https://localhost:7130/api/v1/en/Test/uploadDoc', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmlubyBzYXVsaSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiZjI3MGViM2ItNjNmYy00MmRmLWFhYzQtYjY3NTVlODIwNGExIiwiZW1haWwiOiJzYXVsaW5pbm9AZ21haWwuY29tIiwic3ViIjoic2F1bGluaW5vQGdtYWlsLmNvbSIsImp0aSI6IjY5ODcwMWVmLWRjMTctNGQ3OS04NDVjLThlZmMxOTg3ODU3YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzIzMDEyOTE0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTMwIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMCJ9.mrXcPYQ7gFrLJXIvwcIxvij2MVME9ofGqcPkcH5owYg', // Replace with your actual token
  //       },
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const result = await response.json();
  //     console.log('Success:', result);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

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
                      disabled={loading}
                        className= {` ${loading ? "opacity-50":""} btn btn-brand-1 btn-track`}
                        type="submit"
                        value="Calculate shipping"
                      />
                    </div>
                  </form>
                  {/* <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div> */}
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
