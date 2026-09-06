'use client';

import PageHeader from '@/app/shared/page-header';
import ShipmentRequestsTable from '@/app/shared/logistics/shipment/requests/table';
import { useTranslation } from 'react-i18next';

export default function ShipmentRequestsPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('shipment-requests')}
        breadcrumb={[{ name: t('shipment-requests') }]}
      />
      <ShipmentRequestsTable />
    </>
  );
}
