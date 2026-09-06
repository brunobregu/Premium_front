'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button, Input } from 'rizzui';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import premiumApi from '@/util/premiumAPI';
import { useFiltersContext } from '@/store/state';

type ClientShipmentDetails = {
  vin: string;
  make: string;
  model: string;
  year: string;
  lot: string;
  address: string;
  auction: string;
  port: string;
};

type VehicleDetailsResponse = {
  id: string | null;
  vin: string | null;
  auction: string | null;
  lotNumber: string | null;
  description: string | null;
  modelYear: string | null;
  make: string | null;
  model: string | null;
  enteredDate: string | null;
  terminal: string | null;
  isCargoloop: boolean;
};

type CreateShipmentRequest = {
  vin: string;
  make: string;
  model: string;
  year: number;
  lot: number;
  auction: string;
  port: string;
  carId: number | null;
  address: string;
  isCargoloop: boolean;
};

const initialShipment: ClientShipmentDetails = {
  vin: '',
  make: '',
  model: '',
  year: '',
  lot: '',
  address: '',
  auction: '',
  port: '',
};

export default function ClientCreateShipment() {
  const { t } = useTranslation();
  const { lang } = useFiltersContext();
  const router = useRouter();
  const [shipment, setShipment] =
    useState<ClientShipmentDetails>(initialShipment);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupComplete, setLookupComplete] = useState(false);
  const [isCargoloop, setIsCargoloop] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [carId, setCarId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const vin = shipment.vin.trim();

    if (vin.length !== 17) {
      setIsLookingUp(false);
      setLookupComplete(false);
      setIsCargoloop(false);
      setCarId(null);
      setLookupError('');
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsLookingUp(true);
      setLookupError('');

      try {
        const response = await premiumApi.get<VehicleDetailsResponse>(
          `${lang}/Vehicle/details`,
          {
            params: { vin },
            headers: { Accept: 'text/plain' },
            signal: controller.signal,
          }
        );
        const vehicle = response.data;

        setShipment({
          vin: vehicle.vin || vin,
          make: vehicle.make || '',
          model: vehicle.model || '',
          year: vehicle.modelYear || '',
          lot: vehicle.lotNumber || '',
          address: 'test',
          auction: vehicle.auction || '',
          port: vehicle.terminal || '',
        });
        setIsCargoloop(vehicle.isCargoloop);
        setCarId(vehicle.id ? Number(vehicle.id) : null);
        setLookupComplete(true);
      } catch (error: any) {
        if (error?.code === 'ERR_CANCELED') return;
        setShipment((current) => ({ ...initialShipment, vin: current.vin }));
        setLookupComplete(false);
        setIsCargoloop(false);
        setCarId(null);
        setLookupError(
          error?.response?.data?.detail || t('vehicle-lookup-error')
        );
      } finally {
        if (!controller.signal.aborted) setIsLookingUp(false);
      }
    }, 500);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [shipment.vin, lang, t]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormComplete || isSubmitting) return;

    const payload: CreateShipmentRequest = {
      vin: shipment.vin.trim(),
      make: shipment.make.trim(),
      model: shipment.model.trim(),
      year: Number(shipment.year),
      lot: Number(shipment.lot),
      auction: shipment.auction.trim(),
      port: shipment.port.trim(),
      carId,
      address: shipment.address.trim(),
      isCargoloop,
    };

    setIsSubmitting(true);
    try {
      const response = await premiumApi.post(
        `${lang}/OrderDetails/createShipment`,
        payload,
        { headers: { Accept: '*/*' } }
      );

      if (response.status === 201) {
        toast.success(t('client-shipment-created'), {
          position: 'top-right',
        });
        router.push('/logistics/shipments');
      }
    } catch (error: any) {
      const status = error?.response?.status;
      const responseData = error?.response?.data;

      if (status === 401) {
        toast.error(t('create-shipment-unauthorized'), {
          position: 'top-right',
        });
        router.push('/login');
        return;
      }

      if (status === 403) {
        toast.error(t('create-shipment-forbidden'), {
          position: 'top-right',
        });
        return;
      }

      const validationErrors = responseData?.errors
        ? Object.values(responseData.errors).flat().join(' ')
        : '';
      toast.error(
        validationErrors ||
          responseData?.detail ||
          t('create-shipment-error'),
        { position: 'top-right' }
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const readOnlyInputProps = {
    readOnly: true,
    inputClassName: 'cursor-default bg-gray-50',
    labelClassName: 'font-medium text-gray-900',
  };

  const shipmentDetailsAreEditable = lookupComplete && !isCargoloop;

  const updateField =
    (field: keyof ClientShipmentDetails) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setShipment((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const shipmentDetailProps = shipmentDetailsAreEditable
    ? { labelClassName: 'font-medium text-gray-900' }
    : readOnlyInputProps;

  const isFormComplete =
    lookupComplete &&
    Object.values(shipment).every((value) => value.trim().length > 0) &&
    Number.isInteger(Number(shipment.year)) &&
    Number.isInteger(Number(shipment.lot)) &&
    (!isCargoloop || carId !== null);

  return (
    <div className="@container">
      <form onSubmit={handleSubmit}>
        <h3>{t('vehicle')}</h3>
        <hr />
        <div className="mb-8 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label={t('vin')}
            placeholder={t('vin')}
            labelClassName="font-medium text-gray-900"
            value={shipment.vin}
            onChange={(event) => {
              const vin = event.target.value.toUpperCase();
              setShipment({ ...initialShipment, vin });
              setCarId(null);
            }}
            maxLength={17}
            error={lookupError || undefined}
            helperText={isLookingUp ? t('looking-up-vehicle') : undefined}
          />
          <Input
            label={t('make')}
            placeholder={t('make')}
            value={shipment.make}
            {...readOnlyInputProps}
          />
          <Input
            label={t('model')}
            placeholder={t('model')}
            value={shipment.model}
            {...readOnlyInputProps}
          />
          <Input
            label={t('year')}
            placeholder={t('year')}
            value={shipment.year}
            {...readOnlyInputProps}
          />
        </div>

        <h3>{t('shipment-detail')}</h3>
        <hr />
        <div className="mb-8 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label={t('lot')}
            placeholder={t('lot')}
            type="number"
            value={shipment.lot}
            onChange={updateField('lot')}
            {...shipmentDetailProps}
          />
          <Input
            label={t('address')}
            placeholder={t('address')}
            value={shipment.address}
            onChange={updateField('address')}
            {...shipmentDetailProps}
          />
          <Input
            label={t('auction')}
            placeholder={t('auction')}
            value={shipment.auction}
            onChange={updateField('auction')}
            {...shipmentDetailProps}
          />
          <Input
            label={t('port')}
            placeholder={t('port')}
            value={shipment.port}
            onChange={updateField('port')}
            {...shipmentDetailProps}
          />
        </div>

        <Button
          type="submit"
          className="flex bg-gray-900 !px-14 !py-[.6rem] text-white hover:bg-gray-800"
          isLoading={isLookingUp || isSubmitting}
          disabled={!isFormComplete || isLookingUp || isSubmitting}
        >
          {t('create-shipment')}
        </Button>
      </form>
    </div>
  );
}
