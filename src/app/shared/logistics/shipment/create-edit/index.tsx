'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { CreateShipmentInput } from '@/validators/create-shipping.schema';
import { useLayout } from '@/layouts/use-layout';
import { Controller } from 'react-hook-form';
import { Select, Input, Button, SelectOption } from 'rizzui';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import premiumApi from '@/util/premiumAPI';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import CreateUserModal from '../../../../../components/layout/AddUserModal'; // Adjust the path as necessary

interface IndexProps {
  id?: string;
  className?: string;
  shipment?: CreateShipmentInput;
}

const addOrderDetailsDtoSchema = yup.object().shape({
  vin: yup.string().required('VIN is required'),
  make: yup.string().nullable(),
  model: yup.string().nullable(),
  year: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  lot: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  dspOrderID: yup.string().nullable(),
  port: yup.string().required('Port is required'),
  inlandCargoloop: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  ocCargoloop: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  broker: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  inlandDspch: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  ocCost: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  storage: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer().required(),
  paymentStatus: yup.string().required(),
  partlyPaid: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).integer(),
  userId: yup.string().required(),
});

const paymentStatusArray: SelectOption[] = [
  { label: 'Paid', value: 'Paid' },
  { label: 'Not paid', value: 'Not paid' },
  { label: 'Partly Paid', value: 'Partly Paid' },
];

export default function CreateEditShipment({ id, shipment, className }: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // New state for modal

  const router = useRouter();

  const methods = useForm<any>({
    resolver: yupResolver(addOrderDetailsDtoSchema),
  });
  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => premiumApi.get('/Authentication/getUsersOfRole', { params: { role: 'Client' } }),
  });

  const addOrderDetailsMutation = useMutation({
    mutationFn: (data) => premiumApi.post('/OrderDetails/add', data),
    onSuccess: (data) => {
      toast.success('Shipment Created Successfully');
      router.push('/logistics/shipments');
    },
    onError: () => {
      toast.error('Error creating shipment');
    },
  });

  function onSubmit(data: any) {
    addOrderDetailsMutation.mutate(data);
  }

  const userOptions = query.data?.data?.map((user: any) => ({
    label: user.firstName + ' ' + user.lastName,
    value: user.id,
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
              placeholder="YV4102KK1G1057792"
              labelClassName="font-medium text-gray-900"
              {...register('vin')}
              error={errors.vin?.message as string}
            />
            <Input
              label="Make"
              placeholder="Volvo"
              labelClassName="font-medium text-gray-900"
              {...register('make')}
              error={errors.make?.message as string}
            />
            <Input
              label="Model"
              placeholder="XC90"
              labelClassName="font-medium text-gray-900"
              {...register('model')}
              error={errors.model?.message as string}
            />
            <Input
              label="Year"
              placeholder="2016"
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
              placeholder="36912564"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('lot', { valueAsNumber: true })}
              error={errors.lot?.message as string}
            />
            <Input
              label="DSP Order ID"
              placeholder="VHC0072"
              labelClassName="font-medium text-gray-900"
              {...register('dspOrderID')}
              error={errors.dspOrderID?.message as string}
            />
            <Input
              label="Port"
              placeholder="Elizabeth NJ"
              labelClassName="font-medium text-gray-900"
              {...register('port')}
              error={errors.port?.message as string}
            />
            <Input
              label="Inland Cargoloop"
              placeholder="380"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandCargoloop', { valueAsNumber: true })}
              error={errors.inlandCargoloop?.message as string}
            />
          </div>

          <h3>Shipment cost</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="OC Cargoloop"
              placeholder="850"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('ocCargoloop', { valueAsNumber: true })}
              error={errors.ocCargoloop?.message as string}
            />
            <Input
              label="Broker"
              placeholder="0"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('broker', { valueAsNumber: true })}
              error={errors.broker?.message as string}
            />
            <Input
              label="Inland Dispatch"
              placeholder="300"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('inlandDspch', { valueAsNumber: true })}
              error={errors.inlandDspch?.message as string}
            />
            <Input
              label="OC Cost"
              placeholder="850"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('ocCost', { valueAsNumber: true })}
              error={errors.ocCost?.message as string}
            />
            <Input
              label="Storage"
              placeholder="0"
              labelClassName="font-medium text-gray-900"
              type="number"
              {...register('storage', { valueAsNumber: true })}
              error={errors.storage?.message as string}
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
                    paymentStatusArray?.find((c) => c.value === selected)?.label ?? ''
                  }
                  error={errors?.paymentStatus?.message as string}
                />
              )}
            />
            {methods.watch('paymentStatus') === 'Partly Paid' && (
              <Input
                label="Partly Paid Amount"
                placeholder="0"
                labelClassName="font-medium text-gray-900"
                type="number"
                {...register('partlyPaid', { valueAsNumber: true })}
                error={errors.partlyPaid?.message as string}
              />
            )}
            <Controller
              control={control}
              name="userId"
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center gap-2">
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
                      userOptions?.find((c: any) => c.value === selected)?.label ?? ''
                    }
                    error={errors?.userId?.message as string}
                  />

                </div>
              )}
            />
            <div className="flex flex-row mt-auto items-baseline gap-2" >
              <Button type="button" onClick={() => setModalOpen(true)}>
                Add Client
              </Button>
            </div>

          </div>

          <Button type="submit" isLoading={addOrderDetailsMutation.isPending} className="w-full @xl:w-auto">
            Create Shipment
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
}
