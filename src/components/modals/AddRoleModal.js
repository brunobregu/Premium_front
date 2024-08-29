import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button } from 'rizzui';
import premiumApi from '@/util/premiumAPI';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
    padding: '20px',
  },
};

const createRoleSchema = yup.object().shape({
  name: yup
    .string()
    .required('Role name is required')
    .min(1, 'At least 1 letter'),
});

export default function AddRoleModal({ isOpen, onRequestClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createRoleSchema),
  });

  const createRoleMutation = useMutation({
    mutationFn: (data) => {
      return premiumApi.post('en/Authentication/addRole', data);
    },
    onSuccess: () => {
      toast.success('Role Created Successfully', { position: 'top-right' });
      onRequestClose();
      onSuccess();
      reset();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail || 'Error creating role';
      toast.error(errorMessage, { position: 'top-right' });
    },
  });

  const onSubmit = (data) => {
    createRoleMutation.mutate(data);
  };

  const handleClose = () => {
    reset();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <h2 className="mb-8">Create New Role</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            placeholder="Role Name"
            label="Role Name"
            {...register('name')}
            error={errors.name?.message}
          />
        </div>
        <div className="flex w-full justify-between gap-4">
          <Button
            type="submit"
            className="flex-1"
            isLoading={createRoleMutation.isLoading}
          >
            Save
          </Button>
          <Button type="button" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
