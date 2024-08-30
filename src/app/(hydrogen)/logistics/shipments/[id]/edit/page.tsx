"use client"

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import ImportButton from '@/app/shared/import-button';
import CreateEditShipment from '@/app/shared/logistics/shipment/create-edit';
import { useTranslation } from 'react-i18next';

export default function CreateShipmentPage({ params }: { params: { id: string } }) {
  const { i18n } = useTranslation();


  const pageHeader = {
    title: i18n.t('update-shipment'),
    breadcrumb: [

      {
        href: '/logistics/shipments', // Adjust based on your routes
        name: i18n.t('shipment-list'),
      },
      {
        name: i18n.t('update-shipment')
      },
    ],
  };

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditShipment id={params.id} />
    </>
  );
}
