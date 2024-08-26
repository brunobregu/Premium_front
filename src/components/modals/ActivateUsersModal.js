import React from 'react';
import Modal from 'react-modal';
import { Button, Text, Select } from 'rizzui'; // Assuming you have a Select component
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI'; // Assuming this is the API helper
import toast from 'react-hot-toast';

const ActivateUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  userId,
}) => {
  // Fetch roles from API
  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => premiumApi.get('en/Authentication/getRoles'),
    select: (response) => response.data,
    onError: (error) => {
      toast.error('Error fetching roles', { position: "top-right" });
    },
  });

  const [selectedRole, setSelectedRole] = React.useState('');

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption.value); // Update based on the selected option
  };

  const handleConfirm = () => {
    if (!selectedRole) {
      toast.error('Please select a role', { position: 'top-right' });
      return;
    }
    onConfirm(selectedRole, userId); // Pass the selected role and userId
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Activate User"
      ariaHideApp={false} 
      style={modalStyles}
    >
      <div className="modal-header">
        <Text className="font-bold">Activate User</Text>
      </div>
      <div className="modal-body">
        <Text>Select a role to activate this user:</Text>
        <div className="mt-4">
          <Select
            label="Role"
            options={roles?.map(role => ({ value: role.name, label: role.name }))}
            value={roles?.find(role => role.name === selectedRole)}
            onChange={handleRoleChange} // Update here to receive the selected option directly
            isLoading={rolesLoading}
            placeholder="Select a role"
          />
        </div>
      </div>
      <div className="modal-footer flex justify-between mt-4">
        <Button onClick={onClose} variant="outline">Cancel</Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          disabled={rolesLoading}
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
    padding: '20px',
    width: '400px',
  },
};

export default ActivateUserModal;
