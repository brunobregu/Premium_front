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
import CreateUserModal from '../../../../../components/modals/AddUserModal';
import UpdateCarStatusModal from '../../../../../components/modals/CarStatusModal'; // Adjust the path as necessary

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
  lot: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
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
  broker: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
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
  // storage: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  paymentStatus: yup.string().required('Payment status is required'),
  partlyPaid: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer(),
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

const portOptions: SelectOption[] = [
  { label: 'Savannah', value: 'Savannah' },
  { label: 'Elizabeth', value: 'Elizabeth' },
  { label: 'Houston', value: 'Houston' },
  { label: 'LosAngeles', value: 'LosAngeles' },
  { label: 'Indianapolis', value: 'Indianapolis' },
];

export default function CreateEditShipment({ id, shipment, className }: IndexProps) {

  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCarModalOpen, setCarModalOpen] = useState(false);
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState('');


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

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => premiumApi.get('en/Authentication/getUsersOfRole', { params: { role: 'Client' } }),
  });

  const orderDetailsQuery = useQuery({
    queryKey: ['orderDetails', id, currentStatus],
    queryFn: () => premiumApi.get(`en/OrderDetails/orderById?id=${id}`),
    enabled: !!id,
  });

  const providerQuery = useQuery({
    queryKey: ['providers'],
    queryFn: () => premiumApi.get('en/Provider/providers'),
  });

  const auctionQuery = useQuery({
    queryKey: ['auctions'],
    queryFn: () => premiumApi.get('en/Auction/auctions'),
  });

  const portQuery = useQuery({
    queryKey: ['ports'],
    queryFn: () => premiumApi.get('en/Port/ports'),
  });

  useEffect(() => {
    if (orderDetailsQuery.data) {
      const orderDetails = orderDetailsQuery.data.data;
      setCurrentStatus(orderDetailsQuery.data?.data.carStatus)
      reset(orderDetails);
      setValue('userId', orderDetails.userId);
    }
  }, [orderDetailsQuery.data, reset, setValue]);

  const addOrderDetailsMutation = useMutation({
    mutationFn: (data: CreateShipmentInput) => {
      return premiumApi.put(`en/OrderDetails/update?id=${id}`, data);
    },
    onSuccess: () => {
      toast.success('Shipment Updated Successfully', { position: "top-right" });
      router.push('/logistics/shipments');
    },
    onError: () => {
      toast.error('Error saving shipment');
    },
  });

  const userOptions = query.data?.data?.map((user: any) => ({
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



  return (
    <div className="@container">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>Vehicle</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="VIN"
              placeholder="vin"
              labelClassName="font-medium text-gray-900"
              {...register('vin')}
              error={errors.vin?.message as string}
            />
            <Input
              label="Make"
              placeholder="make"
              labelClassName="font-medium text-gray-900"
              {...register('make')}
              error={errors.make?.message as string}
            />
            <Input
              label="Model"
              placeholder="model"
              labelClassName="font-medium text-gray-900"
              {...register('model')}
              error={errors.model?.message as string}
            />
            <Input
              label="Year"
              placeholder="year"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('year', { valueAsNumber: true })}
              error={errors.year?.message as string}
            />
          </div>

          <h3>Shipment details</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Lot"
              placeholder="lot"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('lot', { valueAsNumber: true })}
              error={errors.lot?.message as string}
            />
            <Input
              label="Order ID"
              placeholder="order id"
              labelClassName="font-medium text-gray-900"
              {...register('dspOrderID')}
              error={errors.orderID?.message as string}
            />
            <Controller
              control={control}
              name="auction"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Auction"
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={auctionOptions.length > 0 ? auctionOptions : [{ label: 'No data available', value: '' }]}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    auctionOptions.find((c: any) => c.value === selected)?.label ?? 'No data available'
                  }
                  error={errors?.port?.message as string}
                />
              )}
            />
            <Controller
              control={control}
              name="port"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Port"
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={portOptions.length > 0 ? portOptions : [{ label: 'No data available', value: '' }]}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    portOptions.find((c: any) => c.value === selected)?.label ?? 'No data available'
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
                  label="Provider"
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={
                    providerOptions.length > 0
                      ? providerOptions
                      : [{ label: 'No data available', value: '' }]
                  }
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    providerOptions.find((c: any) => c.value === selected)?.label ?? 'No data available'
                  }
                  error={errors?.provider?.message as string}
                />
              )}
            />
          </div>

          <h3>Client Total</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Inland Price"
              placeholder="inland price"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandPrice', { valueAsNumber: true })}
              error={errors.inlandPrice?.message as string}
            />
            <Input
              label="Ocean Price"
              placeholder="ocean price"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('oceanPrice', { valueAsNumber: true })}
              error={errors.oceanPrice?.message as string}
            />
            <Input
              label="Broker"
              placeholder="broker"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('broker', { valueAsNumber: true })}
              error={errors.broker?.message as string}
            />
            {/* <Input
              label="Storage"
              placeholder="storage"
              label="Inland Dispatch"
              placeholder="300"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandDspch', { valueAsNumber: true })}
              error={errors.inlandDspch?.message as string}
            /> */}
            {/* <Input
              label="OC Cost"
              placeholder="200"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('ocCost', { valueAsNumber: true })}
              error={errors.ocCost?.message as string}
            />
            <Input
              label="Storage"
              placeholder="storage"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('storage', { valueAsNumber: true })}
              error={errors.storage?.message as string}
            /> */}
          </div>

          <h3>Total Cost</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Inland Cost"
              placeholder="inland cost"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandCost', { valueAsNumber: true })}
              error={errors.inlandCost?.message as string}
            />
            <Input
              label="Ocean Cost"
              placeholder="ocean cost"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('oceanCost', { valueAsNumber: true })}
              error={errors.oceanCost?.message as string}
            />
            <Input
              label="Client Storage"
              placeholder="client storage"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('clientStorage', { valueAsNumber: true })}
              error={errors.clientStorage?.message as string}
            />
            <Input
              label="Storage Cost"
              placeholder="storage cost"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('storageCost', { valueAsNumber: true })}
              error={errors.storageCost?.message as string}
            />
          </div>

          <h3>Payment info</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
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
              label="Partly Paid"
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('partlyPaid', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
            />
          </div>

          <h3>Car status</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">


            <Button
              className="w-100 bg-gray-900 hover:bg-gray-800 text-white mt-auto"
              onClick={() => setCarModalOpen(true)}
              disabled={orderDetailsQuery.data?.data.carStatus === 'Delivered'}
            >
              Update car status ({orderDetailsQuery.data?.data.carStatus ? orderDetailsQuery.data?.data.carStatus : 'Dispatch'})
            </Button>

          </div>


          <h3>User</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Controller
              control={control}
              name="userId"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="User"
                  labelClassName="text-gray-900"
                  dropdownClassName="p-2 gap-1 grid !z-10"
                  inPortal={false}
                  value={value || null}
                  onChange={onChange}
                  options={userOptions}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    userOptions.find((c: any) => c.value === selected)?.label ?? ''
                  }
                  error={errors?.userId?.message as string}
                />
              )}
            />
            <Button
              className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => setModalOpen(true)}
            >
              Add Client
            </Button>

          </div>


          <Button
            type="submit"
            className="!px-14 !py-[.6rem] bg-gray-900 hover:bg-gray-800 text-white"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Update Shipment
          </Button>
        </form >
      </FormProvider >

      <CreateUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
      <UpdateCarStatusModal
        isOpen={isCarModalOpen}
        onClose={() => setCarModalOpen(false)}
        carStatus={orderDetailsQuery.data?.data.carStatus}
        id={id}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />
    </div >
  );
  async function onSubmit(data: CreateShipmentInput) {
    setLoading(true);
    try {
      await addOrderDetailsMutation.mutateAsync(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

}
