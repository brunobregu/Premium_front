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
import { useTranslation } from 'react-i18next';

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

const paymentStatusArray: SelectOption[] = [
  { label: 'Paid', value: 'Paid' },
  { label: 'Not paid', value: 'Not paid' },
  { label: 'Partly Paid', value: 'Partly Paid' },
];
const carStatusArray: SelectOption[] = [
  { label: 'Dispatch', value: 'Dispatch' },
  { label: 'At terminal', value: 'At terminal' },
  { label: 'Booked', value: 'Booked' },
  { label: 'Loaded', value: 'Loaded' },
  { label: 'Delivered', value: 'Delivered' },
];


export default function ViewShipment({
  id,
  shipment,
  className,
  isViewOnly,
}: IndexProps) {

  const { i18n } = useTranslation();
  const handleImageClick = async () => {
    try {
      const response = await premiumApi.get(`en/OrderDetails/viewPhotos?id=${id}`);
      const images = response.data;
      if (images.length > 0) {
        const url = `/logistics/shipments/${id}/uploaded-images`;
        window.open(url, '_blank');
      } else {
        toast.error('No image uploaded', { position: "top-right" });
      }
    } catch (error) {
      toast.error('No image uploaded', { position: "top-right" });
    }
  };

  const handleDocumentClick = async () => {
    try {
      const response = await premiumApi.get(`en/OrderDetails/viewDocuments?id=${id}`);
      const images = response.data;
      if (images.length > 0) {
        const url = `/logistics/shipments/${id}/uploaded-documents`;
        window.open(url, '_blank');
      } else {
        toast.error('No documents uploaded', { position: "top-right" });
      }
    } catch (error) {
      toast.error('No documents uploaded', { position: "top-right" });
    }
  };

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
    queryKey: ['orderDetails', id],
    queryFn: () => premiumApi.get(`en/OrderDetails/myOrderDetailsById?id=${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (orderDetailsQuery.data) {
      const orderDetails = orderDetailsQuery.data.data;
      reset(orderDetails);
      setValue('userId', orderDetails.userId);
    }
  }, [orderDetailsQuery.data, reset, setValue]);


  const link = orderDetailsQuery.data?.data.provider;


  return (
    <div className="@container">
      <FormProvider {...methods}>
        <form>
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
              type="number"
              {...register('year', { valueAsNumber: true })}
              error={errors.year?.message as string}
              disabled={true}
            />
          </div>

          <h3>Shipment details</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={i18n.t('lot')}
              placeholder={i18n.t('lot')}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('lot', { valueAsNumber: true })}
              error={errors.lot?.message as string}
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
            <Controller
              control={control}
              name="carStatus"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Car Status"
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={isViewOnly ? undefined : onChange}
                  options={carStatusArray}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    carStatusArray?.find((c) => c.value === selected)?.label ?? ''
                  }
                  error={errors?.carStatus?.message as string}
                  disabled={true}
                />
              )}
            />
            <Input
              label="Port"
              placeholder="port"
              labelClassName="font-medium text-gray-900"
              {...register('port')}
              error={errors.auction?.message as string}
              disabled={true}
            />
            <Input
              label="Tracking Number"
              placeholder="trackingNumber"
              labelClassName="font-medium text-gray-900"
              {...register('trackingNumber')}
              error={errors.auction?.message as string}
              disabled={true}
            />
            <Button
              className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => {
                window.open(link, '_blank');
              }}
            >
              Tracking URL
            </Button>

            <Button
              className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={handleImageClick}
            >
              View Images
            </Button>
            <Button
              className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={handleDocumentClick}
            >
              View Documents
            </Button>
          </div>

          <h3>Client Total</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Inland Price"
              placeholder="inland price"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandPrice', { valueAsNumber: true })}
              error={errors.inlandPrice?.message as string}
              disabled={true}
            />
            <Input
              label="Ocean Price"
              placeholder="ocean price"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('oceanPrice', { valueAsNumber: true })}
              error={errors.oceanPrice?.message as string}
              disabled={true}
            />
            <Input
              label="Broker"
              placeholder="broker"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('broker', { valueAsNumber: true })}
              error={errors.broker?.message as string}
              disabled={true}
            />
            <Input
              label="Storage"
              placeholder="storage"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('clientStorage', { valueAsNumber: true })}
              error={errors.clientStorage?.message as string}
              disabled={true}
            />
            <Input
              label="Car Price"
              placeholder="car price"
              labelClassName="font-medium text-gray-900"
              {...register('carPrice', { valueAsNumber: true })}
              error={errors.carPrice?.message as string}
              disabled={true}
            />
          </div>

          <h3 className='w-full'>Payment info</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Controller
              control={control}
              name="paymentStatus"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Payment Status"
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={isViewOnly ? undefined : onChange}
                  options={paymentStatusArray}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    paymentStatusArray.find((c) => c.value === selected)?.label ?? ''
                  }
                  error={errors?.paymentStatus?.message as string}
                  disabled={true}
                />
              )}
            />
            <Input
              label="Partly Paid"
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('partlyPaid', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
              disabled={true}
            />
          </div>
        </form >
      </FormProvider >
    </div >
  );

};
