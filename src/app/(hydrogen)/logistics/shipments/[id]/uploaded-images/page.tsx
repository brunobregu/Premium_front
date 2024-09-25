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
  const [vin, setVin] = useState<string>('')

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
    const fetchImages = async () => {
      try {
        const response = await premiumApi.get(`${lang}/OrderDetails/viewPhotos?id=${id}`);
        setImages(response.data.files);
        setVin(response.data.vin)
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Error fetching images', { position: "top-right" });

      }
    };

    fetchImages();
  }, [id]);

  const getImageStyles = () => {
    if (windowWidth <= 768) {
      // Mobile: Smaller images, ensure full image is visible
      return {
        width: '100%',
        height: 'auto',
        maxHeight: '80vh', // Limit max height to prevent overflow
        objectFit: 'contain' as 'contain', // Use 'contain' to ensure the full image fits
      };
    } else if (windowWidth > 768 && windowWidth <= 1024) {
      // Tablet: Medium-sized images
      return {
        width: '70%',
        height: 'auto',
        maxHeight: '80vh', // Ensure full image is visible
        objectFit: 'contain' as 'contain',
      };
    } else {
      // Desktop: Larger images
      return {
        width: '75%',
        height: 'auto',
        maxHeight: '80vh', // Ensure full image is visible
        objectFit: 'cover' as 'cover',
      };
    }
  };

  return (
    <>
      <h1 className='mb-8'>{i18n.t("image-slider")}: {vin}</h1>
      <div className='w-[90%] flex justify-center items-center'>
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
                  ...getImageStyles(),

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
