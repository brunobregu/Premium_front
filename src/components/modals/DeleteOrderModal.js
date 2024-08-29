import React from 'react';
import Modal from 'react-modal';
import { Button, Text } from 'rizzui';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemId }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Deletion"
      ariaHideApp={false}
      style={modalStyles}
    >
      <div className="modal-header">
        <Text className="font-bold">Confirm Deletion</Text>
      </div>
      <div className="modal-body">
        <Text>Are you sure you want to delete this item ?</Text>
      </div>
      <div className="modal-footer mt-4 flex justify-between">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="danger"
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%', 
      maxWidth: '800px',
    },
  };

export default ConfirmDeleteModal;
