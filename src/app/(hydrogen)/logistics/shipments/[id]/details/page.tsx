"use client"

import PageHeader from '@/app/shared/page-header';
import ViewShipment from '@/app/shared/logistics/shipment/details';
import { useState } from 'react';

const pageHeader = {
    title: 'View Shipment',
    breadcrumb: [

        {
            href: '/logistics/shipments', // Adjust based on your routes
            name: 'Shipments List',
        },
        {
            name: 'View Details',
        },
    ],
};


export default function EditShipmentsPage({ params }: { params: { id: string } }) {
    const { id } = params
    const [shipment, setShipment] = useState<any>(null);


    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
            <ViewShipment id={id} shipment={shipment} />
        </>
    );
}
