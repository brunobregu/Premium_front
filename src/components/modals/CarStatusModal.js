import premiumApi from '@/util/premiumAPI';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { Button } from 'rizzui';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "700px",
        height:"300px",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const UpdateCarStatusModal = ({ onClose, isOpen, carStatus, id , setCurrentStatus,currentStatus }) => {
    const { handleSubmit } = useForm();
    const [photos, setPhotos] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [loading, setLoading]= useState(false)
    // const [currentStatus, setCurrentStatus] = useState(carStatus);
  

    const handleFileUpload = (e, setFileState) => {
        const files = Array.from(e.target.files);
        setFileState(prevFiles => [...prevFiles, ...files]);
    };
    const handleRemoveFile = (index, setFileState) => {
        setFileState(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        const formData = new FormData();

        if (currentStatus === 'Dispatch') {
            const totalSize = photos.reduce((acc, file) => acc + file.size, 0);
            const isValidFormat = photos.every(file => ['image/jpeg', 'image/png'].includes(file.type));

            if (photos.length < 1 || photos.length > 10) {
                // alert("You must upload at least 1 and no more than 10 photos.");
                toast.error("You must upload at least 1 and no more than 10 photos.", { position: "top-right" });
                return;
            }

            if (totalSize > 5 * 1024 * 1024) {
                // alert("Total size of photos must not exceed 5MB.");
                toast.error("Total size of photos must not exceed 5MB.", { position: "top-right" });
                return;
            }

            if (!isValidFormat) {
                // alert("Allowed photo formats are: .jpg, .jpeg, .png");
                toast.error("Allowed photo formats are: .jpg, .jpeg, .png", { position: "top-right" });
                return;
            }

            photos.forEach((photo, index) => {
                formData.append('Photos', photo);
            });

        } else if (currentStatus === 'Booked') {
            formData.append('CarStatus', 'Loaded');
            formData.append('TrackingNumber', trackingNumber);

            if (trackingNumber.length<3) {
                toast.error("You must insert the tracing number", { position: "top-right" });
            }

            if (documents.length !== 2) {
                // alert("You must upload exactly 2 documents.");
                toast.error("You must upload exactly 2 documents.", { position: "top-right" });
                return;
            }

            const areDocumentsPdf = documents.every((doc) => doc.name.toLowerCase().endsWith(".pdf"));

            if (!areDocumentsPdf) {
             toast.error("All documents must be in PDF format.", { position: "top-right" });
            return;
            }

            const totalSize = documents.reduce((acc, file) => acc + file.size, 0);
            if (totalSize > 5 * 1024 * 1024) {
                // alert("Total size of documents must not exceed 5MB.");
                toast.error("Total size of documents must not exceed 5MB.", { position: "top-right" });
                return;
            }

            documents.forEach((doc, index) => {
                formData.append('Documents', doc);
            });
        }else if (currentStatus === 'At terminal' || currentStatus === 'Loaded') {
            // Skip adding body data if currentStatus is 'At terminal' or 'Loaded'
            formData.append('CarStatus', currentStatus); // Preserve current status if needed
        }
        setLoading(true)
        premiumApi.put(`en/OrderDetails/updateCarStatus?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                toast.success("Car status changed", { position: "top-right" });
                setCurrentStatus(response.data);  // Assuming response data contains the updated status
                onClose(); // Close modal after success
            })
            .catch(error => {
                toast.error(error.response?.data?.detail || 'Error updating, try againg', { position: "top-right" });
            }).finally(() => setLoading(false));
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
                                onChange={(e) => handleFileUpload(e, setPhotos)}
                                disabled={photos.length >= 10}
                                className='mt-2'
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

                {
                    currentStatus === 'At terminal' && <p className='font-bold'>Car at terminal, book it</p>
                }
                 {
                    currentStatus === 'Loaded' && <p className='font-bold'>Car loaded</p>
                }
                {currentStatus === 'Booked' && (
                    <>
                    <div className='flex flex-col mb-4'>
                    <label>Tracking Number:</label>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                    </div>
                     
                        <label>Upload Documents (2, Max total size: 5MB):</label>
                        <input
                            type="file"
                            accept=".pdf"
                            multiple
                            onChange={(e) => handleFileUpload(e, setDocuments)}
                        />

<div className='grid grid-cols-4 gap-4 mt-2'>
                            {documents.map((doc, index) => (
                                <div key={index} className='relative'>
                                    <a href={URL.createObjectURL(doc)} target="_blank" rel="noopener noreferrer">
                                        <img
                                            // src='/pdf-icon.png' // Replace with an actual icon if you have one
                                            // src={URL.createObjectURL(doc)}
                                            src="https://icons.veryicon.com/png/o/file-type/file-type-1/pdf-icon.png"
                                            alt={`Document ${index + 1}`}
                                            style={{ 
                                                width: '50px', 
                                                height: '50px', 
                                                objectFit: 'cover', 
                                                borderRadius: '4px' 
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
                <div className='flex flex-row justify-between mt-14 gap-10 '>
                    <Button type="submit"  color='primary' className={`${loading?"opacity-50" : ""} w-[300px]`}
                    disabled={loading}>Update Status</Button>
                    <Button type="button" color='danger' onClick={onClose} className='w-[300px]'>Close Modal </Button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateCarStatusModal;
