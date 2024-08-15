import premiumApi from '@/util/premiumAPI';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { Button } from 'rizzui';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "700px",
        height:"350px",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const UpdateCarStatusModal = ({ onClose, isOpen, carStatus, id }) => {
    const { handleSubmit } = useForm();
    const [photos, setPhotos] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [currentStatus, setCurrentStatus] = useState('Dispatch');
console.log('currentStatus', currentStatus)
const handleFileUpload = (e, setFileState, existingFiles) => {
    const files = Array.from(e.target.files);
    setFileState([...existingFiles, ...files]);
};
    const onSubmit = (data) => {
        const formData = new FormData();

        if (currentStatus === 'Dispatch') {
            const totalSize = photos.reduce((acc, file) => acc + file.size, 0);
            const isValidFormat = photos.every(file => ['image/jpeg', 'image/png'].includes(file.type));

            if (photos.length < 1 || photos.length > 10) {
                alert("You must upload at least 1 and no more than 10 photos.");
                return;
            }

            if (totalSize > 5 * 1024 * 1024) {
                alert("Total size of photos must not exceed 5MB.");
                return;
            }

            if (!isValidFormat) {
                alert("Allowed photo formats are: .jpg, .jpeg, .png");
                return;
            }

            formData.append('CarStatus', 'At terminal');
            photos.forEach((photo, index) => {
                formData.append(`Photos[${index}]`, photo);
            });
        } else if (currentStatus === 'Booked') {
            formData.append('CarStatus', 'Loaded');
            formData.append('TrackingNumber', trackingNumber);

            if (documents.length !== 2) {
                alert("You must upload exactly 2 documents.");
                return;
            }

            const totalSize = documents.reduce((acc, file) => acc + file.size, 0);
            if (totalSize > 5 * 1024 * 1024) {
                alert("Total size of documents must not exceed 5MB.");
                return;
            }

            documents.forEach((doc, index) => {
                formData.append(`Documents[${index}]`, doc);
            });
        }

        premiumApi.put(`en/OrderDetails/updateCarStatus?id=${id}`, formData)
            .then(response => {
                console.log('response', response);
                setCurrentStatus(response.data);  // Assuming response data contains the updated status
                onClose(); // Close modal after success
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleRemovePhoto = (index) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    };
    
    return (
        <Modal onClose={onClose} isOpen={isOpen} style={modalStyles}>
            <form onSubmit={handleSubmit(onSubmit)}>
            {currentStatus === 'Dispatch' && (
                    <>
                    <div className='flex flex-col mb-4'>
                    <label>Upload Photos (1-10, Max total size: 5MB):</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            multiple
                            onChange={(e) => handleFileUpload(e, setPhotos, photos)}
                            disabled={photos.length>10}
                        />
                    </div>
                      
                    <div className='grid grid-cols-10 gap-2'>
    {photos.map((photo, index) => (
        <div key={index} className='relative'>
            <a href={URL.createObjectURL(photo)} target="_blank" rel="noopener noreferrer">
                <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    style={{ 
                        width: '50px', 
                        height: '50px', 
                        objectFit: 'cover', 
                        borderRadius: '4px' 
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
                    textAlign: 'center'
                }}
            >
                ×
            </button>
        </div>
    ))}
</div>

                    </>
                )}
                {currentStatus === 'Booked' && (
                    <>
                        <label>Tracking Number:</label>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                        <label>Upload Documents (2, Max total size: 5MB):</label>
                        <input
                            type="file"
                            accept=".pdf"
                            multiple
                            onChange={(e) => handleFileUpload(e, setDocuments)}
                        />
                    </>
                )}
<div className='flex flex-col justify-start mt-8 bottom-0'>
 <Button type="submit">Update Status</Button>
                <Button type="button" className='mt-8' onClick={onClose}>Close Modal</Button>
</div>
               
            </form>
        </Modal>
    );
};

export default UpdateCarStatusModal;
