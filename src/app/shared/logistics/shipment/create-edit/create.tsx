'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form';
import { CreateShipmentInput } from '@/validators/create-shipping.schema';
import { useLayout } from '@/layouts/use-layout';
import { Select, Input, Button, SelectOption } from 'rizzui';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import premiumApi from '@/util/premiumAPI';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import CreateUserModal from '../../../../../components/modals/AddUserModal'; // Adjust the path as necessary
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';

interface IndexProps {
  id?: string;
  className?: string;
  shipment?: CreateShipmentInput;
}

const addOrderDetailsDtoSchema = yup.object().shape({
  vin: yup.string().required('VIN is required'),
  make: yup.string().required('Make is required'),
  model: yup.string().required('Model is required'),
  year: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .min(1990, 'Year must be at least 1990')
    .required('Year is required'),
  lot: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .required(),
  orderID: yup.string().required('Order ID is required'),
  port: yup.string().required('Port is required'),
  auction: yup.string().min(1, 'Auction is required'),
  provider: yup.string().min(1, 'Provider is required'),
  inlandPrice: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .min(1, 'Inland price must be at least 1')
    .required('Inland price is required'),
  oceanPrice: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .min(1, 'Ocean price must be at least 1')
    .required('Ocean price is required'),
  // broker: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  inlandCost: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .min(1, 'Inland Cost must be at least 1')
    .required('Inland Cost is required'),
  oceanCost: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .integer()
    .min(1, 'Ocean Cost must be at least 1')
    .required('Ocean Cost is required'),
  // clientStorage: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required('Client storage is required'),
  paymentStatus: yup.string().required('Payment status is required'),
  partlyPaid: yup
    .number()
    .transform((value) => (value === 0 || Number.isNaN(value) ? 0 : value))
    .integer()
    .required(),
  userId: yup.string().required(),
});

const paymentStatusArray: SelectOption[] = [
  { label: 'Paid', value: 'Paid' },
  { label: 'Not Paid', value: 'Not Paid' },
  { label: 'Partly Paid', value: 'Partly Paid' },
];

export default function CreateEditShipment({
  id,
  shipment,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { i18n } = useTranslation();
  const { lang, setLang } = useFiltersContext();
  const addOrderDetailsDtoSchema = yup.object().shape({
    vin: yup.string().required(i18n.t('validation.vin-required')),
    make: yup.string().required(i18n.t('validation.make-required')),
    model: yup.string().required(i18n.t('validation.model-required')),
    year: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .integer()
      .min(1990, i18n.t('validation.year-min'))
      .required(i18n.t('validation.year-required')),
    lot: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .integer()
      .required(i18n.t('validation.lot-required')),
    orderID: yup.string().required(i18n.t('validation.orderID-required')),
    port: yup.string().required(i18n.t('validation.port-required')),
    auction: yup.string().min(1, i18n.t('validation.auction-required')),
    provider: yup.string().min(1, i18n.t('validation.provider-required')),
    inlandPrice: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .integer()
      .min(1, i18n.t('validation.inlandPrice-min'))
      .required(i18n.t('validation.inlandPrice-required')),
    oceanPrice: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .integer()
      .min(1, i18n.t('validation.oceanPrice-min'))
      .required(i18n.t('validation.oceanPrice-required')),
    inlandCost: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .integer()
      .min(1, i18n.t('validation.inlandCost-min'))
      .required(i18n.t('validation.inlandCost-required')),
    oceanCost: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .integer()
      .min(1, i18n.t('validation.oceanCost-min'))
      .required(i18n.t('validation.oceanCost-required')),
    paymentStatus: yup.string().required(i18n.t('validation.paymentStatus-required')),
    partlyPaid: yup
      .number()
      .transform((value) => (value === 0 || Number.isNaN(value) ? 0 : value))
      .integer()
      .required(i18n.t('validation.partlyPaid-required')),
    userId: yup.string().required(i18n.t('validation.userId-required')),
    carPrice: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .integer()
      .required(i18n.t('validation.carPrice-required')),
  });

  const paymentStatusArray: SelectOption[] = [
    { label: i18n.t('paid'), value: 'Paid' },
    { label: i18n.t('not-paid'), value: 'Not Paid' },
    { label: i18n.t('partly-paid'), value: 'Partly Paid' },
  ];



  const methods = useForm<any>({
    resolver: yupResolver(addOrderDetailsDtoSchema),
    defaultValues: shipment || {}, // Initialize form with shipment data if available
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    setValue,
  } = methods;

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      premiumApi.get(`${lang}/Authentication/getUsersOfRole`, {
        params: { role: 'Client' },
      }),
  });

  const orderDetailsQuery = useQuery({
    queryKey: ['orderDetails', id],
    queryFn: () => premiumApi.get(`${lang}/OrderDetails/orderById?id=${id}`),
    enabled: !!id,
  });

  const auctionQuery = useQuery({
    queryKey: ['auctions'],
    queryFn: () => premiumApi.get(`${lang}/Auction/auctions`),
  });

  const portQuery = useQuery({
    queryKey: ['ports'],
    queryFn: () => premiumApi.get(`${lang}/Port/ports`),
  });

  const providerQuery = useQuery({
    queryKey: ['providers'],
    queryFn: () => premiumApi.get(`${lang}/Provider/providers`),
  });

  useEffect(() => {
    if (orderDetailsQuery.data) {
      const orderDetails = orderDetailsQuery.data.data;
      reset(orderDetails);
      setValue('userId', orderDetails.userId);
    }
  }, [orderDetailsQuery.data, reset, setValue]);

  const addOrderDetailsMutation = useMutation({
    mutationFn: (data: CreateShipmentInput) => {
      if (id) {
        return premiumApi.put(`${lang}/OrderDetails/update?id=${id}`, data);
      } else {
        return premiumApi.post(`${lang}/OrderDetails/add`, data);
      }
    },
    onSuccess: () => {
      toast.success(
        id ? 'Shipment Updated Successfully' : 'Shipment Created Successfully',
        { position: 'top-right' }
      );
      router.push('/logistics/shipments');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.detail || 'Error saving order, try againg',
        { position: 'top-right' }
      );
    },
  });

  const userOptions =
    query.data?.data?.map((user: any) => ({
      label: user.firstName + ' ' + user.lastName,
      value: user.id,
    })) ?? [];

  const auctionOptions = auctionQuery.data?.data?.map((item: any) => ({
    label: item.name, // Adjust based on actual API response
    value: item.id,
  })) ?? [];

  const portOptions = portQuery.data?.data?.map((item: any) => ({
    label: item.name, // Adjust based on actual API response
    value: item.id,
  })) ?? [];

  const providerOptions = providerQuery.data?.data?.map((item: any) => ({
    label: item.name, // Adjust based on actual API response
    value: item.name,
  })) ?? [];

  const handleModalSuccess = () => {
    query.refetch(); // Refetch users after creating a new one
  };

  const paymentStatus = useWatch({
    control,
    name: 'paymentStatus', // Watch the 'paymentStatus' field
  });

  return (

    <div className="@container">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>{i18n.t("vehicle")}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
            <Input
              label={i18n.t("vin")}
              placeholder={i18n.t("vin")}
              labelClassName="font-medium text-gray-900"
              {...register('vin')}
              error={errors.vin?.message as string}
            />
            <Input
              label={i18n.t("make")}
              placeholder={i18n.t("make")}
              labelClassName="font-medium text-gray-900"
              {...register('make')}
              error={errors.make?.message as string}
            />
            <Input
              label={i18n.t("model")}
              placeholder={i18n.t("model")}
              labelClassName="font-medium text-gray-900"
              {...register('model')}
              error={errors.model?.message as string}
            />
            <Input
              label={i18n.t("year")}
              placeholder={i18n.t("year")}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('year', { valueAsNumber: true })}
              error={errors.year?.message as string}
            />
          </div>

          <h3>{i18n.t("shipment-detail")}</h3>
          <hr />
          <div className="mb-4 mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
            <Input
              label={i18n.t("lot")}
              placeholder={i18n.t("lot")}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('lot', { valueAsNumber: true })}
              error={errors.lot?.message as string}
            />
            <Input
              label={i18n.t("order-id")}
              placeholder={i18n.t("order-id")}
              labelClassName="font-medium text-gray-900"
              {...register('orderID')}
              error={errors.orderID?.message as string}
            />
            <Controller
              control={control}
              name="auction"
              render={({ field: { value, onChange } }) => (
                <Select
                  label={i18n.t("auction")}
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={
                    auctionOptions.length > 0
                      ? auctionOptions
                      : [{ label: i18n.t("not-avaiable"), value: 'auction' }]
                  }
                  getOptionValue={(option) => option.label}
                  displayValue={(selected) =>
                    auctionOptions.find((c: any) => c.label === selected)?.label ?? i18n.t("not-avaiable")
                  }
                  error={errors?.auction?.message as string}
                />
              )}
            />

            <Controller
              control={control}
              name="port"
              render={({ field: { value, onChange } }) => (
                <Select
                  label={i18n.t("port")}
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={
                    portOptions.length > 0
                      ? portOptions
                      : [{ label: i18n.t("not-avaiable"), value: 'port' }]
                  }
                  getOptionValue={(option) => option.label}
                  displayValue={(selected) =>
                    portOptions.find((c: any) => c.label === selected)?.label ??
                    i18n.t("not-avaiable")
                  }
                  error={errors?.port?.message as string}
                />
              )}
            />

            <Controller
              control={control}
              name="provider"
              render={({ field: { value, onChange } }) => (
                <Select
                  label={i18n.t("provider")}
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={
                    providerOptions.length > 0
                      ? providerOptions
                      : [{ label: i18n.t("not-avaiable"), value: 'provider' }]
                  }
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    providerOptions.find((c: any) => c.value === selected)
                      ?.label ?? i18n.t("not-avaiable")
                  }
                  error={errors?.provider?.message as string}
                />
              )}
            />
          </div>

          <h3>{i18n.t("client-total")}</h3>
          <hr />
          <div className="mb-4 mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
            <Input
              label={i18n.t("inland-price")}
              placeholder={i18n.t("inland-price")}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandPrice', { valueAsNumber: true })}
              error={errors.inlandPrice?.message as string}
            />
            <Input
              label={i18n.t("ocean-price")}
              placeholder={i18n.t("ocean-price")}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('oceanPrice', { valueAsNumber: true })}
              error={errors.oceanPrice?.message as string}
            />
            <Input
              label={i18n.t("broker")}
              placeholder={i18n.t("broker")}
              labelClassName="font-medium text-gray-900"
              type="number"
              defaultValue={0}
              {...register('broker', { valueAsNumber: true })}
              error={errors.broker?.message as string}
            />
            <Input
              label={i18n.t("client-storage")}
              placeholder={i18n.t("client-storage")}
              labelClassName="font-medium text-gray-900"
              type="number"
              defaultValue={0}
              {...register('clientStorage', { valueAsNumber: true })}
              error={errors.clientStorage?.message as string}
            />
            <Input
              label={i18n.t("car-price")}
              placeholder={i18n.t("car-price")}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('carPrice', { valueAsNumber: true })}
              error={errors.carPrice?.message as string}
            />
          </div>

          <h3>{i18n.t("total-cost")}</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
            <Input
              label={i18n.t("inland-cost")}
              placeholder={i18n.t("inland-cost")}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandCost', { valueAsNumber: true })}
              error={errors.inlandCost?.message as string}
            />
            <Input
              label={i18n.t("ocean-cost")}
              placeholder={i18n.t("ocean-cost")}
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('oceanCost', { valueAsNumber: true })}
              error={errors.oceanCost?.message as string}
            />
            <Input
              label={i18n.t("storage-cost")}
              placeholder={i18n.t("storage-cost")}
              labelClassName="font-medium text-gray-900"
              type="number"
              defaultValue={0}
              {...register('storageCost', { valueAsNumber: true })}
              error={errors.storageCost?.message as string}
            />
          </div>

          <h3>{i18n.t("payment-info")}</h3>
          <hr />
          <div className="mb-4 mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
            <Controller
              control={control}
              name="paymentStatus"
              render={({ field: { value, onChange } }) => (
                <Select
                  label={i18n.t("payment-status")}
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={paymentStatusArray}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    paymentStatusArray.find((c) => c.value === selected)?.label ?? ''
                  }
                  error={errors?.paymentStatus?.message as string}
                />
              )}
            />
            <Input
              defaultValue={0}
              label={i18n.t("partly-paid")}
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('partlyPaid', { valueAsNumber: true })}
              error={paymentStatus && paymentStatus === 'Partly Paid' && errors.partlyPaid?.message as string}
            />
          </div>

          <h3>{i18n.t("user")}</h3>
          <hr />
          <div className="mb-4 mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
            <Controller
              control={control}
              name="userId"
              render={({ field: { value, onChange } }) => (
                <Select
                  label={i18n.t("user")}
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={
                    userOptions.length > 0
                      ? userOptions
                      : [{ label: i18n.t("not-avaiable"), value: '' }]
                  }
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    userOptions.find((c: any) => c.value === selected)?.label ?? i18n.t("not-avaiable")
                  }
                  error={errors?.userId?.message as string}
                />
              )}
            />
            <Button
              className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => setModalOpen(true)}
            >
              {i18n.t("add-client")}
            </Button>
          </div>

          <Button
            type="submit"
            className="!px-14 !py-[.6rem]  flex-1 mx-auto md:mx-0 flex sm:justify-center md:justify-start bg-gray-900 hover:bg-gray-800 text-white"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {i18n.t("create-shipment")}
          </Button>
        </form>
      </FormProvider>

      <CreateUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const formData = {
        ...data,
        storageCost: data.storageCost ?? 0,
        broker: data.broker ?? 0,
        clientStorage: data.clientStorage ?? 0,
      };
      await addOrderDetailsMutation.mutateAsync(formData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
}
