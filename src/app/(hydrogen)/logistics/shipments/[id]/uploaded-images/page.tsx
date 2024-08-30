"use client";

import { useState, useEffect } from 'react';
import premiumApi from '@/util/premiumAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';


interface Image {
  base64: string;

}

const ImageSliderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { lang, setLang } = useFiltersContext();
  const [images, setImages] = useState<Image[]>([]);
  const { i18n } = useTranslation()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await premiumApi.get(`${lang}/OrderDetails/viewPhotos?id=${id}`);
        setImages(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Error fetching images', { position: "top-right" });

      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <h1>{i18n.t("image-slider")}: {id}</h1>
      <div style={{ width: 'auto', display: 'flex', flexDirection: 'row' }}>
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          style={{ width: '100%', height: '100%' }}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <img
                src={`data:image/jpeg;base64,${image.base64}`}
                alt={`Image ${index + 1}`}
                style={{
                  width: '400px',
                  height: '600px',
                  objectFit: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ImageSliderPage;
