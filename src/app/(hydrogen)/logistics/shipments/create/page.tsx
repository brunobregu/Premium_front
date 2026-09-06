"use client"

import { useEffect, useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import CreateEditShipment from '@/app/shared/logistics/shipment/create-edit/create';
import ClientCreateShipment from '@/app/shared/logistics/shipment/create-edit/client-create';
import { useTranslation } from 'react-i18next';


export default function CreateShipmentPage() {
  const { i18n } = useTranslation();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, []);


  const pageHeader = {
    title: i18n.t('create-shipment'),
    breadcrumb: [

      {
        href: '/logistics/shipments', // Adjust based on your routes
        name: i18n.t('shipment-list'),
      },
      {
        name: i18n.t('create-shipment')
      },
    ],
  };
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      {userRole === 'Client' ? (
        <ClientCreateShipment />
      ) : userRole ? (
        <CreateEditShipment />
      ) : null}
    </>
  );
}
