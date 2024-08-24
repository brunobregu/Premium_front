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
    width: '400px', // Adjusted size
    padding: '20px',
  },
};

const createProviderSchema = yup.object().shape({
  name: yup.string().required('Provider  is required').min(1, 'At least 1 letter'),
  link: yup.string().required('Link is required'),
});

export default function AddProviderModal({ isOpen, onRequestClose, onSuccess }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(createProviderSchema),
  });

  const createProviderMutation = useMutation({
    mutationFn: (data) => {
      return premiumApi.post('en/Provider/add', data);
    },
    onSuccess: () => {
      toast.success('Provider Created Successfully', { position: "top-right" });
      onRequestClose();
      onSuccess();
      reset();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.detail || 'Error creating provider';
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  const onSubmit = (data) => {
    createProviderMutation.mutate(data);
  };

  const handleClose = () => {
    reset();
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={modalStyles} ariaHideApp={false}>
      <h2 className='mb-8'>Create New Provider</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            placeholder="Provider Name"
            label="Provider Name"
            {...register('name')}
            error={errors.name?.message}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Provider Link"
            label="Provider Link"
            {...register('link')}
            error={errors.link?.message}
          />
        </div>
        <div className='flex justify-between w-full gap-4'>
          <Button type="submit" className='flex-1' isLoading={createProviderMutation.isLoading}>Save</Button>
          <Button type="button" className='flex-1' onClick={handleClose}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
}
