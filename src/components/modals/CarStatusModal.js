import { useFiltersContext } from '@/store/state';
import premiumApi from '@/util/premiumAPI';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Button } from 'rizzui';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '90%', 
        maxWidth: '800px',
        height:"300px",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const UpdateCarStatusModal = ({
  onClose,
  isOpen,
  carStatus,
  id,
  setCurrentStatus,
  currentStatus,
}) => {
  const { handleSubmit } = useForm();
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { lang, setLang } = useFiltersContext();
  // const [currentStatus, setCurrentStatus] = useState(carStatus);

  const handleFileUpload = (e, setFileState) => {
    const files = Array.from(e.target.files);
    setFileState((prevFiles) => [...prevFiles, ...files]);
  };
  const handleRemoveFile = (index, setFileState) => {
    setFileState((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    if (currentStatus === 'Dispatch') {
      const totalSize = photos.reduce((acc, file) => acc + file.size, 0);
      const isValidFormat = photos.every((file) =>
        ['image/jpeg', 'image/png'].includes(file.type)
      );

      if (photos.length < 1 || photos.length > 10) {
        toast.error(t('photo_count_error'), { position: 'top-right' });
        return;
      }

      if (totalSize > 5 * 1024 * 1024) {
        toast.error(t('photo_size_error'), { position: 'top-right' });
        return;
      }

      if (!isValidFormat) {
        toast.error(t('photo_format_error'), { position: 'top-right' });
        return;
      }

      photos.forEach((photo, index) => {
        formData.append('Photos', photo);
      });
    } else if (currentStatus === 'Booked') {
      formData.append('CarStatus', 'Loaded');
      formData.append('TrackingNumber', trackingNumber);

      if (trackingNumber.length < 3) {
        toast.error(t('tracking_number_error'), { position: 'top-right' });
      }

      if (documents.length !== 2) {
        toast.error(t('document_count_error'), { position: 'top-right' });
        return;
      }

      const areDocumentsPdf = documents.every((doc) =>
        doc.name.toLowerCase().endsWith('.pdf')
      );

      if (!areDocumentsPdf) {
        toast.error(t('document_format_error'), { position: 'top-right' });
        return;
      }

      const totalSize = documents.reduce((acc, file) => acc + file.size, 0);
      if (totalSize > 5 * 1024 * 1024) {
        toast.error(t('document_size_error'), { position: 'top-right' });
        return;
      }

      documents.forEach((doc, index) => {
        formData.append('Documents', doc);
      });
    } else if (currentStatus === 'At terminal' || currentStatus === 'Loaded') {
      formData.append('CarStatus', currentStatus);
    }
    setLoading(true);
    premiumApi
      .put(`${lang}/OrderDetails/updateCarStatus?id=${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success(t('status_changed'), { position: 'top-right' });
        setCurrentStatus(response.data);
        onClose();
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.detail || t('update_error'),
          { position: 'top-right' }
        );
      })
      .finally(() => setLoading(false));
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} style={modalStyles}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStatus === 'Dispatch' && (
          <>
            <div className="mb-4 flex flex-col">
              <label>{t('upload_photos')}</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) => handleFileUpload(e, setPhotos)}
                disabled={photos.length >= 10}
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-10 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <a
                    href={URL.createObjectURL(photo)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      lineHeight: '18px',
                      textAlign: 'center',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {currentStatus === 'At terminal' && (
          <p className="font-bold">{t('car_at_terminal')}</p>
        )}
        {currentStatus === 'Loaded' && <p className="font-bold">Car loaded</p>}
        {currentStatus === 'Booked' && (
          <>
            <div className="mb-4 flex flex-col">
              <label>{t('tracking_number')}</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>

            <label>{t('upload_documents')}</label>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => handleFileUpload(e, setDocuments)}
            />

            <div className="mt-2 grid grid-cols-4 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="relative">
                  <a
                    href={URL.createObjectURL(doc)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      // src='/pdf-icon.png' // Replace with an actual icon if you have one
                      // src={URL.createObjectURL(doc)}
                      src="https://icons.veryicon.com/png/o/file-type/file-type-1/pdf-icon.png"
                      alt={`Document ${index + 1}`}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <span>{`${doc.name.substring(0, 14)}...`}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index, setDocuments)}
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '45px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      lineHeight: '18px',
                      textAlign: 'center',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mt-14 flex flex-row justify-between gap-10 ">
          <Button
            type="submit"
            color="primary"
            className={`${loading ? 'opacity-50' : ''} w-[300px]`}
            disabled={loading}
          >
             {t('save')}
          </Button>
          <Button
            type="button"
            color="danger"
            onClick={onClose}
            className="w-[300px]"
          >
          {t("close")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateCarStatusModal;
