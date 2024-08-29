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
  const [storedLang, setStoredLang] = useState('en'); // Initialize with default 'en'

  useEffect(() => {
    const langFromStorage = localStorage.getItem('language') || 'en';
    setStoredLang(langFromStorage); // Set the language in state // Update i18n language
  }, []);

  const handleImageClick = async () => {
    try {
      const response = await premiumApi.get(
        `en/OrderDetails/viewPhotos?id=${id}`
      );
      const images = response.data;
      if (images.length > 0) {
        const url = `/logistics/shipments/${id}/uploaded-images`;
        window.open(url, '_blank');
      } else {
        toast.error('No image uploaded', { position: 'top-right' });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error, try againg', {
        position: 'top-right',
      });
    }
  };

  const handleDocumentClick = async () => {
    try {
      const response = await premiumApi.get(
        `en/OrderDetails/viewDocuments?id=${id}`
      );
      const images = response.data;
      if (images.length > 0) {
        const url = `/logistics/shipments/${id}/uploaded-documents`;
        window.open(url, '_blank');
      } else {
        toast.error('No documents uploaded', { position: 'top-right' });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error, try againg', {
        position: 'top-right',
      });
    }
  };

  const router = useRouter();

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

  const orderDetailsQuery = useQuery({
    queryKey: ['orderDetails', id, storedLang],
    queryFn: () =>
      premiumApi.get(
        `${storedLang}/OrderDetails/adminOrderDetailsById?id=${id}`
      ),
    enabled: !!id,
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
        return premiumApi.put(`en/OrderDetails/update?id=${id}`, data);
      } else {
        return premiumApi.post('en/OrderDetails/add', data);
      }
    },
    onSuccess: () => {
      toast.success(
        id ? 'Shipment Updated Successfully' : 'Shipment Created Successfully'
      );
      router.push('/logistics/shipments');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.detail || 'Error saving shipment, try againg',
        { position: 'top-right' }
      );
    },
  });

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
  const updatedOn = orderDetailsQuery.data?.data.updatedBy;
  const formattedCreatedOn = createdOn ? formatDate(createdOn) : '';
  const formattedUpdatedOn = updatedOn ? formatDate(updatedOn) : '';

  return (
    <div className="@container">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>Order Details</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Created By"
              placeholder="Not avaible"
              labelClassName="font-medium text-gray-900"
              {...register('createdBy')}
              disabled={true}
            />
            <Input
              label="Created On"
              placeholder="Not avaible"
              labelClassName="font-medium text-gray-900"
              value={formattedCreatedOn}
              disabled={true}
            />
            <Input
              label="Updated By"
              placeholder="Not avaible"
              labelClassName="font-medium text-gray-900"
              {...register('updatedBy', { valueAsNumber: true })}
              error={errors.year?.message as string}
              disabled={true}
            />
            <Input
              label="Updated On"
              placeholder="Not avaible"
              labelClassName="font-medium text-gray-900"
              value={formattedUpdatedOn}
              disabled={true}
            />
          </div>

          <h3>Vehicle</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="VIN"
              placeholder="vin"
              labelClassName="font-medium text-gray-900"
              {...register('vin')}
              error={errors.vin?.message as string}
              disabled={true}
            />
            <Input
              label="Make"
              placeholder="make"
              labelClassName="font-medium text-gray-900"
              {...register('make')}
              error={errors.make?.message as string}
              disabled={true}
            />
            <Input
              label="Model"
              placeholder="model"
              labelClassName="font-medium text-gray-900"
              {...register('model')}
              error={errors.model?.message as string}
              disabled={true}
            />
            <Input
              label="Year"
              placeholder="year"
              labelClassName="font-medium text-gray-900"
              {...register('year', { valueAsNumber: true })}
              error={errors.year?.message as string}
              disabled={true}
            />
          </div>

          <h3>Shipment details</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Lot"
              placeholder="lot"
              labelClassName="font-medium text-gray-900"
              {...register('lot', { valueAsNumber: true })}
              error={errors.lot?.message as string}
              disabled={true}
            />
            <Input
              label="Order ID"
              placeholder="order id"
              labelClassName="font-medium text-gray-900"
              {...register('orderID')}
              error={errors.orderID?.message as string}
              disabled={true}
            />
            <Input
              label="Auction"
              placeholder="auction"
              labelClassName="font-medium text-gray-900"
              {...register('auction')}
              error={errors.auction?.message as string}
              disabled={true}
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
              label="Provider"
              placeholder="provider"
              labelClassName="font-medium text-gray-900"
              {...register('provider')}
              error={errors.auction?.message as string}
              disabled={true}
            />
            <Input
              label="Tracking Number"
              placeholder="Not avaible"
              labelClassName="font-medium text-gray-900"
              {...register('trackingNumber')}
              error={errors.auction?.message as string}
              disabled={true}
            />
            <Button
              className="w-100 mt-6 bg-gray-900 text-white hover:bg-gray-800"
              onClick={handleImageClick}
            >
              View Images
            </Button>
            <Button
              className="w-100 mt-6 bg-gray-900 text-white hover:bg-gray-800"
              onClick={handleDocumentClick}
            >
              View Documents
            </Button>
            <Input
              label="Car Status"
              placeholder="carStatus"
              labelClassName="font-medium text-gray-900"
              {...register('carStatus')}
              error={errors.carStatus?.message as string}
              disabled={true}
            />
          </div>

          <h3>Client Total</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Client Total"
              placeholder="Not avaible"
              labelClassName="font-medium text-gray-900"
              {...register('clientTotal', { valueAsNumber: true })}
              error={errors.clientTotal?.message as string}
              disabled={true}
            />
            <Input
              label="Inland Price"
              placeholder="inland price"
              labelClassName="font-medium text-gray-900"
              {...register('inlandPrice', { valueAsNumber: true })}
              error={errors.inlandPrice?.message as string}
              disabled={true}
            />
            <Input
              label="Ocean Price"
              placeholder="ocean price"
              labelClassName="font-medium text-gray-900"
              {...register('oceanPrice', { valueAsNumber: true })}
              error={errors.oceanPrice?.message as string}
              disabled={true}
            />
            <Input
              label="Broker"
              placeholder="broker"
              labelClassName="font-medium text-gray-900"
              {...register('broker', { valueAsNumber: true })}
              error={errors.broker?.message as string}
              disabled={true}
            />
            <Input
              label="Client Storage"
              placeholder="client storage"
              labelClassName="font-medium text-gray-900"
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

          <h3>Total Cost</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Total Cost"
              placeholder="Total cost"
              labelClassName="font-medium text-gray-900"
              {...register('totalCost', { valueAsNumber: true })}
              error={errors.totalCost?.message as string}
              disabled={true}
            />
            <Input
              label="Inland Cost"
              placeholder="inland cost"
              labelClassName="font-medium text-gray-900"
              {...register('inlandCost', { valueAsNumber: true })}
              error={errors.inlandCost?.message as string}
              disabled={true}
            />
            <Input
              label="Ocean Cost"
              placeholder="ocean cost"
              labelClassName="font-medium text-gray-900"
              {...register('oceanCost', { valueAsNumber: true })}
              error={errors.oceanCost?.message as string}
              disabled={true}
            />
            <Input
              label="Storage Cost"
              placeholder="storage cost"
              labelClassName="font-medium text-gray-900"
              {...register('storageCost', { valueAsNumber: true })}
              error={errors.storageCost?.message as string}
              disabled={true}
            />
            <Input
              label="Profit"
              placeholder="profit"
              labelClassName="font-medium text-gray-900"
              {...register('profit' || null, { valueAsNumber: true })}
              error={errors.profit?.message as string}
              disabled={true}
            />
          </div>

          <h3 className="w-full">Payment info</h3>
          <hr />
          <div className="mb-4 mt-4  grid grid-cols-4 gap-4">
            <Input
              label="Payment Status"
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              {...register('paymentStatus', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
              disabled={true}
            />
            <Input
              label="Partly Paid"
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              {...register('partlyPaid', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
              disabled={true}
            />
            <Input
              label="To Be Paid"
              placeholder="100"
              labelClassName="font-medium text-gray-900"
              {...register('toBePaid', { valueAsNumber: true })}
              error={errors.partlyPaid?.message as string}
              disabled={true}
            />
          </div>

          <h3 className="mt-4 w-full">User</h3>
          <hr />
          <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Client"
              placeholder="fullName"
              labelClassName="font-medium text-gray-900"
              {...register('fullName', { valueAsNumber: true })}
              error={errors.fullName?.message as string}
              disabled={true}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );

  async function onSubmit(data: CreateShipmentInput) {
    if (isViewOnly) return; // Prevent submission if view-only

    setLoading(true);
    try {
      await addOrderDetailsMutation.mutateAsync(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
}
