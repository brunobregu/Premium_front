import React from 'react';
import Modal from 'react-modal';
import { Button, Text, Select } from 'rizzui'; // Assuming you have a Select component
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI'; // Assuming this is the API helper
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';

const ActivateUserModal = ({ isOpen, onClose, onConfirm, userId }) => {
  const { i18n } = useTranslation();
  const { lang, setLang } = useFiltersContext();
  // Fetch roles from API
  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => premiumApi.get(`${lang}/Authentication/getRoles`),
    select: (response) => response.data,
    onError: (error) => {
      toast.error(
        error.response?.data?.detail || i18n.t('error.fetch-roles'),
        { position: 'top-right' }
      );
    },
  });

  const [selectedRole, setSelectedRole] = React.useState('');

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption.value); // Update based on the selected option
  };

  const handleConfirm = () => {
    if (!selectedRole) {
      toast.error(i18n.t('error.select-role'), { position: 'top-right' });
      return;
    }
    onConfirm(selectedRole, userId); // Pass the selected role and userId
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={i18n.t('activate-user.title')}
      ariaHideApp={false}
      style={modalStyles}
    >
      <div className="modal-header">
        <Text className="font-bold">{i18n.t('activate-user.title')}</Text>
      </div>
      <div className="modal-body">
        <Text>{i18n.t('activate-user.select-role')}</Text>
        <div className="mt-4">
          <Select
            label={i18n.t('activate-user.role-label')}
            options={roles?.map((role) => ({
              value: role.name,
              label: role.name,
            }))}
            value={roles?.find((role) => role.name === selectedRole)}
            onChange={handleRoleChange} // Update here to receive the selected option directly
            isLoading={rolesLoading}
            placeholder={i18n.t('activate-user.select-role-placeholder')}
          />
        </div>
      </div>
      <div className="modal-footer mt-4 flex justify-between">
        <Button onClick={onClose} variant="outline">
          {i18n.t('activate-user.cancel')}
        </Button>
        <Button onClick={handleConfirm} color="primary" disabled={rolesLoading}>
          {i18n.t('activate-user.confirm')}
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
    padding: '20px',
    width: '90%', 
    maxWidth: '800px',
  },
};

export default ActivateUserModal;
