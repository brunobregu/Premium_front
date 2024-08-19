"use client";

import { useState, useEffect } from 'react';
import premiumApi from '@/util/premiumAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Define the type for the image object
interface Image {
  base64: string;
  // Add other properties if they exist in the image object
}

const ImageSliderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  // Explicitly set the state type to an array of Image objects
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await premiumApi.get(`en/OrderDetails/viewPhotos?id=${id}`);
        setImages(response.data); // Assuming response.data is an array of Image objects
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <h1>Image Slider</h1>
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
