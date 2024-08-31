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
    padding: '20px',
  },
};


export default function AddRoleModal({ isOpen, onRequestClose, onSuccess }) {

  const { lang, setLang } = useFiltersContext();
  const {i18n}= useTranslation()

  const createRoleSchema = yup.object().shape({
    name: yup
      .string()
      .required(i18n.t("role-required"))
  });

  
  const createRoleMutation = useMutation({
    mutationFn: (data) => {
      return premiumApi.post(`${lang}/Authentication/addRole`, data);
    },
    onSuccess: () => {
      toast.success(i18n.t("role-created"), { position: 'top-right' });
      onRequestClose();
      onSuccess();
      reset();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail || i18n.t("role-error");
      toast.error(errorMessage, { position: 'top-right' });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createRoleSchema),
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
      <h2 className="mb-8">{i18n.t("create-role")}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            placeholder={i18n.t("role-name")}
            label={i18n.t("role-name")}
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
          {i18n.t("save")}
          </Button>
          <Button type="button" className="flex-1" onClick={handleClose}>
          {i18n.t("cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
