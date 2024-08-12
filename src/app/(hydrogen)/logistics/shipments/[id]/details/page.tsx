import PageHeader from '@/app/shared/page-header';
import ViewShipment from '@/app/shared/logistics/shipment/details';
import premiumApi from '@/util/premiumAPI';
import axios from 'axios';

const pageHeader = {
    title: 'Edit Shipment',
    breadcrumb: [
        {
            href: '/dashboard', // Adjust based on your routes
            name: 'Dashboard',
        },
        {
            href: '/shipments', // Adjust based on your routes
            name: 'Shipments',
        },
        {
            name: 'View Details',
        },
    ],
};

export default function EditShipmentsPage({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
            <ViewShipment id={id} />
        </>
    );
}
export function generateStaticParams() {
    const ids = Array.from({ length: 100 }, (_, index) => ({
        id: (index + 1).toString(),
    }));

    return ids;
}
