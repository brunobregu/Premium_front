"use client"

import PageHeader from '@/app/shared/page-header';
import ViewShipment from '@/app/shared/logistics/shipment/details';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';



export default function EditShipmentsPage({ params }: { params: { id: string } }) {
    const { id } = params
    const [shipment, setShipment] = useState<any>(null);
    const { i18n } = useTranslation();


    const pageHeader = {
        title: i18n.t('view-shipment'),
        breadcrumb: [

            {
                href: '/logistics/shipments', // Adjust based on your routes
                name: i18n.t('shipment-list'),
            },
            {
                name: i18n.t('view-details'),
            },
        ],
    };
    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
            <ViewShipment id={id} shipment={shipment} />
        </>
    );
}
