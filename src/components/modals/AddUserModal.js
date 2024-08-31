import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button } from 'rizzui';
import premiumApi from '@/util/premiumAPI';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useFiltersContext } from '@/store/state';
import { useTranslation } from 'react-i18next';

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
    height: '500px', 
    padding: '20px', 
  },
};



export default function CreateUserModal({ isOpen, onRequestClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { lang, setLang } = useFiltersContext();
  const {i18n}= useTranslation()

  const createUserSchema = yup.object().shape({
    firstName: yup.string().required(i18n.t("first-name-required")),
    lastName: yup.string().required(i18n.t("last-name-required")),
    email: yup.string().email(i18n.t("email-invalid")).required(i18n.t("email-required")),
    password: yup
      .string()
      .required(i18n.t("password-required"))
      .min(8, i18n.t("password-length")),
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: (data) => {
      setLoading(true);
      return premiumApi.post(`${lang}/Authentication/addUser`, data);
    },
    onSuccess: (data) => {
      toast.success( i18n.t("user-created"), { position: 'top-right' });
      onRequestClose();
      onSuccess();
      reset();
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      const errorMessage =
        error.response?.data?.detail || i18n.t("user-error");
      toast.error(errorMessage, { position: 'top-right' });
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <h2 className="mb-8">{i18n.t('create-user')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            placeholder={i18n.t("user-first-name")}
            label={i18n.t("user-first-name")}
            {...register('firstName')}
            error={errors.firstName?.message}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder={i18n.t("user-last-name")}
            label={i18n.t("user-last-name")}
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder= {i18n.t('email-address')}
            label={i18n.t('email-address')}
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder= {i18n.t('password.label')}
            label=   {i18n.t('password.label')}
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>
        <div className="flex w-full justify-between gap-4">
          <Button
            type="submit"
            style={{ opacity: loading === true ? 0.5 : 1 }}
            className={`${loading === true ? 'opacity-50' : ' '} flex-1`}
            isLoading={createUserMutation.isLoading}
            disabled={setLoading === true}
          >
               {i18n.t('save')}
          </Button>
          <Button type="button" className=" flex-1" onClick={handleClose}>
          {i18n.t('cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
