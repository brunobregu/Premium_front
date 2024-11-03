"use client";

import { useState, useEffect } from 'react';
import premiumApi from '@/util/premiumAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Document {
  base64: string;
  filename: string;
}

const base64ToBlob = (base64: string, type: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type });
};

const DocumentSliderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [documents, setDocuments] = useState<Document[]>([]);
  const { i18n } = useTranslation();
  const { lang } = useFiltersContext();
  const [vin, setVin] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    handleResize();
    setIsMobile(window.innerWidth <= 768);
    // Add event listener to update window width on resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await premiumApi.get(`${lang}/OrderDetails/viewDocuments?id=${id}`);
        setDocuments(response.data.files);
        setVin(response.data.vin);
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Error fetching documents', { position: 'top-right' });
      }
    };

    fetchDocuments();
  }, [id]);

  // Responsive sizing logic for embed based on window width
  const getEmbedStyles = () => {
    if (windowWidth <= 768) {
      return {
        width: '75%',
        height: '60vh',
      };
    } else if (windowWidth > 768 && windowWidth <= 1024) {
      return {
        width: '85%',
        height: '70vh',
      };
    } else {
      return {
        width: '90%',
        height: '80vh',
        maxWidth: '600px',
      };
    }
  };

  return (
    <>
      <h1 className="mb-8">{i18n.t('document-slider')}: {vin}</h1>
      <div className='w-[90%] flex justify-center items-center'>
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          style={{ width: '100%', height: '100%' }}
        >
          {documents.map((document, index) => {
            const blob = base64ToBlob(document.base64, 'application/pdf');
            const url = URL.createObjectURL(blob); // Create an object URL from the Blob

            return (
              <SwiperSlide
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                {isMobile ? (
                  <a
                    href={url}
                    download={`document_${index}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex justify-center items-center'
                    style={{ ...getEmbedStyles(), color: 'blue', textDecoration: 'underline' }}
                  >
                    {document.filename}
                  </a>
                ) : (
                  <embed
                    src={url}
                    type="application/pdf"
                    style={{
                      ...getEmbedStyles(),
                      border: '1px solid #ddd',
                    }}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default DocumentSliderPage;
