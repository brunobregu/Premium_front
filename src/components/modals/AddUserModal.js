import { useState } from 'react';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
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
    width: '500px',
    height: '500px', 
    padding: '20px', 
  },
};

const createUserSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

export default function CreateUserModal({ isOpen, onRequestClose, onSuccess }) {
  const [loading, setLoading]= useState(false)
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const createUserMutation = useMutation({
    
    mutationFn: (data) => {
      setLoading(true)
      return premiumApi.post('en/Authentication/addUser', data);
    },
    onSuccess: (data) => {
      toast.success('User Created Successfully',{position:"top-right"});
      onRequestClose();
      onSuccess();
      reset();
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
      const errorMessage = error.response?.data?.detail || 'Error creating user';
      toast.error(errorMessage, {position:"top-right"});
    },
    
  });

  const onSubmit = (data) => {
    createUserMutation.mutate({ ...data, roleName: 'Client' });
  };

  const handleClose = () => {
    reset();
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles} ariaHideApp={false}>
      <h2 className='mb-8'>Create New Client</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            placeholder="First Name"
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Last Name"
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>
        <div className="mb-4">
          <Input
             placeholder="Email"
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4">
          <Input
             placeholder="Password"
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>
        <div className='flex justify-between w-full gap-4'>
        <Button type="submit" style={{opacity:loading===true ? 0.5 : 1 }} className={`${loading===true? "opacity-50": " "} flex-1`} isLoading={createUserMutation.isLoading} disabled={setLoading===true}>Save</Button>
        <Button type="button" className=' flex-1' onClick={handleClose}>Cancel</Button>
        </div>

      </form>
    </Modal>
  );
}
