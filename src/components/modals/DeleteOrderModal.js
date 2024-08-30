import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Button, Text } from 'rizzui';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemId }) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={t('confirm-delete.content-label')}
      ariaHideApp={false}
      style={modalStyles}
    >
      <div className="modal-header">
        <Text className="font-bold">{t('confirm-delete.title')}</Text>
      </div>
      <div className="modal-body">
        <Text>{t('confirm-delete.body')}</Text>
      </div>
      <div className="modal-footer mt-4 flex justify-between">
        <Button onClick={onClose} variant="outline">
          {t('confirm-delete.cancel')}
        </Button>
        <Button
          onClick={() => {
            onConfirm(itemId);
            onClose();
          }}
          color="danger"
        >
          {t('confirm-delete.confirm')}
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
