'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { CreateShipmentInput } from '@/validators/create-shipping.schema';
import { useLayout } from '@/layouts/use-layout';
import { Select, Input, Button, SelectOption } from 'rizzui';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import premiumApi from '@/util/premiumAPI';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import CreateUserModal from '../../../../../components/modals/AddUserModal'; // Adjust the path as necessary
import { shipmentData as fakeShipmentData } from '@/app/shared/logistics/shipment/create-edit/form-utils';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';

interface IndexProps {
  id?: string;
  className?: string;
  shipment?: CreateShipmentInput;
  isViewOnly?: boolean; // New prop to determine if the form should be view-only
}

const addOrderDetailsDtoSchema = yup.object().shape({
  vin: yup.string().required('VIN is required'),
  make: yup.string().nullable(),
  model: yup.string().nullable(),
  year: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  lot: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  dspOrderID: yup.string().nullable(),
  port: yup.string().required('Port is required'),
  inlandCargoloop: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  ocCargoloop: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  broker: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  inlandDspch: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  ocCost: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  storage: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  paymentStatus: yup.string().required(),
  partlyPaid: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer(),
  userId: yup.string().required(),
});

export default function ViewShipment({
  id,
  shipment,
  className,
  isViewOnly,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { i18n } = useTranslation();
  const { lang, setLang } = useFiltersContext();
  const handleImageClick = async () => {
    try {
      const response = await premiumApi.get(`${lang}/OrderDetails/viewPhotos?id=${id}`);
      const images = response.data;
      if (images.length > 0) {
        const url = `/logistics/shipments/${id}/uploaded-images`;
        window.open(url, '_blank');
      } else {
        toast.error('No image uploaded', { position: "top-right" });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error, try againg', { position: "top-right" });
    }
  };

  const handleDocumentClick = async () => {
    try {
      const response = await premiumApi.get(`${lang}/OrderDetails/viewDocuments?id=${id}`);
      const images = response.data;
      if (images.length > 0) {
        const url = `/logistics/shipments/${id}/uploaded-documents`;
        window.open(url, '_blank');
      } else {
        toast.error('No documents uploaded', { position: "top-right" });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error, try againg', { position: "top-right" });
    }
  };

  const router = useRouter();

  const methods = useForm<any>({
    resolver: yupResolver(addOrderDetailsDtoSchema),
    defaultValues: shipment || {} // Initialize form with shipment data if available
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    setValue
  } = methods;



  const orderDetailsQuery = useQuery({
    queryKey: ['orderDetails'],
    queryFn: () => premiumApi.get(`${lang}/OrderDetails/adminOrderDetailsById?id=${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (orderDetailsQuery.data) {
      const orderDetails = orderDetailsQuery.data.data;
      reset(orderDetails);
      setValue('userId', orderDetails.userId);
    }
  }, [orderDetailsQuery.data]);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const createdOn = orderDetailsQuery.data?.data.createdOn;
  const updatedOn = orderDetailsQuery.data?.data.updatedOn;
  const formattedCreatedOn = createdOn ? formatDate(createdOn) : '';
  const formattedUpdatedOn = updatedOn ? formatDate(updatedOn) : '';

  return (
    <div className="@container">
      <FormProvider {...methods}>
        <form >
          <h3>{i18n.t("order-details")}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t('created-by')}
              placeholder={i18n.t('not-avaiable')}
              labelClassName="font-medium text-gray-900"
              {...register('createdBy')}
              disabled={true}
            />
            <Input
              label={i18n.t('created-on')}
              placeholder={i18n.t('not-avaiable')}
              labelClassName="font-medium text-gray-900"
              value={formattedCreatedOn}
              disabled={true} />
            <Input
              label={i18n.t('updated-by')}
              placeholder={i18n.t('not-avaiable')}
              labelClassName="font-medium text-gray-900"
              {...register('updatedBy', { valueAsNumber: true })}
              error={errors.year?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('created-on')}
              placeholder={i18n.t('not-avaiable')}
              labelClassName="font-medium text-gray-900"
              value={formattedUpdatedOn}
              disabled={true}
            />

          </div>

          <h3>{i18n.t('vehicle')}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t('vin')}
              placeholder={i18n.t('vin')}
              labelClassName="font-medium text-gray-900"
              {...register('vin')}
              error={errors.vin?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('make')}
              placeholder={i18n.t('make')}
              labelClassName="font-medium text-gray-900"
              {...register('make')}
              error={errors.make?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('model')}
              placeholder={i18n.t('model')}
              labelClassName="font-medium text-gray-900"
              {...register('model')}
              error={errors.model?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('year')}
              placeholder={i18n.t('year')}
              labelClassName="font-medium text-gray-900"
              {...register('year', { valueAsNumber: true })}
              error={errors.year?.message as string}
              disabled={true}
            />
          </div>

          <h3>{i18n.t('shipment-detail')}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t('lot')}
              placeholder={i18n.t('lot')}
              labelClassName="font-medium text-gray-900"
              {...register('lot', { valueAsNumber: true })}
              error={errors.lot?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('order-id')}
              placeholder={i18n.t('order-id')}
              labelClassName="font-medium text-gray-900"
              {...register("orderID")}
              error={errors.orderID?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('auction')}
              placeholder={i18n.t('auction')}
              labelClassName="font-medium text-gray-900"
              {...register('auction')}
              error={errors.auction?.message as string}
              disabled={true}
            />

            <Input
              label={i18n.t('port')}
              placeholder={i18n.t('port')}
              labelClassName="font-medium text-gray-900"
              {...register('port')}
              error={errors.auction?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('provider')}
              placeholder={i18n.t('provider')}
              labelClassName="font-medium text-gray-900"
              {...register('provider')}
              error={errors.auction?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('tracking-number')}
              placeholder={i18n.t('not-avaiable')}
              labelClassName="font-medium text-gray-900"
              {...register('trackingNumber')}
              error={errors.auction?.message as string}
              disabled={true}
            />
            <Button
              className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={handleImageClick}
            >
              {i18n.t("view-images")}
            </Button>
            <Button
              className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={handleDocumentClick}
            >
              {i18n.t("view-documents")}
            </Button>
            <Input
              label={i18n.t('car-status')}
              placeholder={i18n.t('car-status')}
              labelClassName="font-medium text-gray-900"
              {...register('carStatus')}
              error={errors.carStatus?.message as string}
              disabled={true}
            />
          </div>

          <h3>{i18n.t('client-total')}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t('client-total')}
              placeholder={i18n.t('not-avaiable')}
              labelClassName="font-medium text-gray-900"
              {...register('clientTotal', { valueAsNumber: true })}
              error={errors.clientTotal?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('inland-price')}
              placeholder={i18n.t('inland-price')}
              labelClassName="font-medium text-gray-900"
              {...register('inlandPrice', { valueAsNumber: true })}
              error={errors.inlandPrice?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('ocean-price')}
              placeholder={i18n.t('ocean-price')}
              labelClassName="font-medium text-gray-900"
              {...register('oceanPrice', { valueAsNumber: true })}
              error={errors.oceanPrice?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('broker')}
              placeholder={i18n.t('broker')}
              labelClassName="font-medium text-gray-900"
              {...register('broker', { valueAsNumber: true })}
              error={errors.broker?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('client-storage')}
              placeholder={i18n.t('client-storage')}
              labelClassName="font-medium text-gray-900"
              {...register('clientStorage', { valueAsNumber: true })}
              error={errors.clientStorage?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('car-price')}
              placeholder={i18n.t('car-price')}
              labelClassName="font-medium text-gray-900"
              {...register('carPrice', { valueAsNumber: true })}
              error={errors.carPrice?.message as string}
              disabled={true}
            />
          </div>

          <h3>{i18n.t('total-cost')}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t('total-cost')}
              placeholder={i18n.t('total-cost')}
              labelClassName="font-medium text-gray-900"
              {...register('totalCost', { valueAsNumber: true })}
              error={errors.totalCost?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('inland-cost')}
              placeholder={i18n.t('inland-cost')}
              labelClassName="font-medium text-gray-900"
              {...register('inlandCost', { valueAsNumber: true })}
              error={errors.inlandCost?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('ocean-cost')}
              placeholder={i18n.t('ocean-cost')}
              labelClassName="font-medium text-gray-900"
              {...register('oceanCost', { valueAsNumber: true })}
              error={errors.oceanCost?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('storage-cost')}
              placeholder={i18n.t('storage-cost')}
              labelClassName="font-medium text-gray-900"
              {...register('storageCost', { valueAsNumber: true })}
              error={errors.storageCost?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t('profit')}
              placeholder={i18n.t('profit')}
              labelClassName="font-medium text-gray-900"
              {...register('profit' || null, { valueAsNumber: true })}
              error={errors.profit?.message as string}
              disabled={true}
            />
          </div>


          <h3 className='w-full'>{i18n.t("payment-info")}</h3>
          <hr />
          <div className="mb-4 mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t("payment-status")}
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              {...register('paymentStatus', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t("partly-paid")}
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              {...register('partlyPaid', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
              disabled={true}
            />
            <Input
              label={i18n.t("to-be-paid")}
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              {...register('toBePaid', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
              disabled={true}
            />

          </div>

          <h3 className='w-full mt-4'>{i18n.t("user")}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t('client')}
              placeholder="fullName"
              labelClassName="font-medium text-gray-900"
              {...register('fullName', { valueAsNumber: true })}
              error={errors.fullName?.message as string}
              disabled={true}
            />
          </div>
        </form >
      </FormProvider >
    </div >
  );
}
