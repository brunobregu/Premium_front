"use client";

import { useState, useEffect } from 'react';
import premiumApi from '@/util/premiumAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';

interface Document {
  base64: string;
}

const DocumentSliderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [documents, setDocuments] = useState<Document[]>([]);
  const { i18n } = useTranslation()
  const { lang, setLang } = useFiltersContext();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await premiumApi.get(`${lang}/OrderDetails/viewDocuments?id=${id}`);
        setDocuments(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Error fetching documents', { position: "top-right" });
      }
    };

    fetchDocuments();
  }, [id]);

  return (
    <>
      <h1>{i18n.t("document-slider")}: {id}</h1>
      <div style={{ width: 'auto', display: 'flex', flexDirection: 'row' }}>
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          style={{ width: '100%', height: '100%' }}
        >
          {documents.map((document, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {/* Render PDFs using iframe or embed */}
              <embed
                src={`data:application/pdf;base64,${document.base64}`}
                type="application/pdf"
                width="600px"
                height="800px"
                style={{ border: '1px solid #ddd' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default DocumentSliderPage;
