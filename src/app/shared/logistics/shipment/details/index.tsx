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
    { label: 'prov', value: 'prov' },
];

export default function ViewShipment({ id, shipment, className, isViewOnly }: IndexProps) {
    const { layout } = useLayout();
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();

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

    // const query = useQuery({
    //     queryKey: ['user'],
    //     queryFn: () => premiumApi.get('en/Authentication/getUsersOfRole', { params: { role: 'Client' } }),
    // });

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

    const addOrderDetailsMutation = useMutation({
        mutationFn: (data: CreateShipmentInput) => {
            if (id) {
                return premiumApi.put(`en/OrderDetails/update?id=${id}`, data);
            } else {
                return premiumApi.post('en/OrderDetails/add', data);
            }
        },
        onSuccess: () => {
            toast.success(id ? 'Shipment Updated Successfully' : 'Shipment Created Successfully');
            router.push('/logistics/shipments');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.detail || 'Error saving shipment, try againg', { position: "top-right" });
        },
    });

    // const userOptions = query.data?.data?.map((user: any) => ({
    //     label: user.firstName + ' ' + user.lastName,
    //     value: user.id,
    // })) ?? [];

    // const handleModalSuccess = () => {
    //     query.refetch(); // Refetch users after creating a new one
    // };

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
                            type="number"
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
                            type="number"
                            {...register('lot', { valueAsNumber: true })}
                            error={errors.lot?.message as string}
                            disabled={true}
                        />
                        {/* <Input
                            label="Order ID"
                            placeholder="order id"
                            labelClassName="font-medium text-gray-900"
                            {...register('dspOrderID')}
                            error={errors.orderID?.message as string}
                            disabled={true}
                        /> */}
                        <Input
                            label="Auction"
                            placeholder="auction"
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
                                    onChange={isViewOnly ? undefined : onChange}
                                    options={portOptions}
                                    getOptionValue={(option) => option.value}
                                    displayValue={(selected) =>
                                        portOptions.find((c) => c.value === selected)?.label ?? ''
                                    }
                                    error={errors?.port?.message as string}
                                    disabled={true}
                                />
                            )}
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
                                window.open('https://msc.com', '_blank');
                            }}
                        >
                            Tracking URL
                        </Button>

                        {/* <Input
                            label="Images"
                            placeholder="trackingNumber"
                            labelClassName="font-medium text-gray-900"
                            {...register('trackingNumber')}
                            error={errors.auction?.message as string}
                            disabled={true}
                        /> */}
                        <Button
                            className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
                            onClick={handleImageClick}
                        >
                            View Images
                        </Button>
                        {/* <Input
                            label="Documents"
                            placeholder="trackingNumber"
                            labelClassName="font-medium text-gray-900"
                            {...register('trackingNumber')}
                            error={errors.auction?.message as string}
                            disabled={true}
                        /> */}
                        <Button
                            className="w-100 mt-6 bg-gray-900 hover:bg-gray-800 text-white"
                            onClick={handleDocumentClick}
                        >
                            View Documents
                        </Button>
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
                    </div>

                    <h3 className='w-full'>Payment info</h3>
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
