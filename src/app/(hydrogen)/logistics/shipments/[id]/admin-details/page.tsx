"use client"

import PageHeader from '@/app/shared/page-header';
import ViewShipment from '@/app/shared/logistics/shipment/details-admin/index';
import premiumApi from '@/util/premiumAPI';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { shipmentData as fakeShipmentData } from '@/app/shared/logistics/shipment/create-edit/form-utils';

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

    useEffect(() => {
        const fetchShipmentData = async () => {
            try {
                const response = await premiumApi.get(`en/OrderDetails/adminOrderDetailsById?id=${id}`);
                setShipment(response.data);
            } catch (error) {
                console.error('Error fetching shipment data:', error);
                setShipment(fakeShipmentData); // Use fake data in case of error
            }
        };

        fetchShipmentData();
    }, [id]);

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
            <ViewShipment id={id} shipment={shipment} />
        </>
    );
}
