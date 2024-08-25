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
    partlyPaid: yup.number().transform((value) => (value === 0 || Number.isNaN(value) ? 0 : value)).integer().min(1, 'Partly paid is required'),
    userId: yup.string().required(),
});

const paymentStatusArray: SelectOption[] = [
    { label: 'Paid', value: 'Paid' },
    { label: 'Not Paid', value: 'Not Paid' },
    { label: 'Partly Paid', value: 'Partly Paid' },
];

export default function CreateEditShipment({ id, shipment, className }: IndexProps) {
    const { layout } = useLayout();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
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

    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => premiumApi.get('en/Authentication/getUsersOfRole', { params: { role: 'Client' } }),
    });

    const orderDetailsQuery = useQuery({
        queryKey: ['orderDetails', id],
        queryFn: () => premiumApi.get(`en/OrderDetails/orderById?id=${id}`),
        enabled: !!id,
    });

    const auctionQuery = useQuery({
        queryKey: ['auctions'],
        queryFn: () => premiumApi.get('en/Auction/auctions'),
    });

    const portQuery = useQuery({
        queryKey: ['ports'],
        queryFn: () => premiumApi.get('en/Port/ports'),
    });

    const providerQuery = useQuery({
        queryKey: ['providers'],
        queryFn: () => premiumApi.get('en/Provider/providers'),
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
        onError: (error) => {
            toast.error('Error saving order', { position: "top-right" });
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

    const paymentStatus = useWatch({
        control,
        name: 'paymentStatus', // Watch the 'paymentStatus' field
    });

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
                            {...register('orderID')}
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
                                    options={
                                        auctionOptions.length > 0
                                            ? auctionOptions
                                            : [{ label: 'No data available', value: 'auction' }]
                                    }
                                    getOptionValue={(option) => option.value}
                                    displayValue={(selected) =>
                                        auctionOptions.find((c: any) => c.value === selected)?.label ?? 'No data available'
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
                                    label="Port"
                                    labelClassName="text-gray-900"
                                    dropdownClassName="p-2 gap-1 grid !z-10"
                                    inPortal={false}
                                    value={value || null}
                                    onChange={onChange}
                                    options={
                                        portOptions.length > 0
                                            ? portOptions
                                            : [{ label: 'No data available', value: 'port' }]
                                    }
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
                        <Input
                            label="Client Storage"
                            placeholder="client storage"
                            labelClassName="font-medium text-gray-900"
                            type="number"
                            {...register('clientStorage', { valueAsNumber: true })}
                            error={errors.clientStorage?.message as string}
                        />
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
                            defaultValue={0}
                            label="Partly Paid"
                            placeholder="100"
                            labelClassName="font-medium text-gray-900"
                            type="number"
                            {...register('partlyPaid', { valueAsNumber: true })}
                            error={paymentStatus && paymentStatus === 'Partly Paid' && errors.partlyPaid?.message as string}
                        />
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
                                    options={
                                        userOptions.length > 0
                                            ? userOptions
                                            : [{ label: 'No data available', value: '' }]
                                    }
                                    getOptionValue={(option) => option.value}
                                    displayValue={(selected) =>
                                        userOptions.find((c: any) => c.value === selected)?.label ?? 'No data available'
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
