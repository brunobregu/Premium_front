"use client"


import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import { shipmentData } from '@/data/shipment-data';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';

const pageHeader = {
    title: 'Roles',
    breadcrumb: [
        {
            name: 'Dashborad',
        },
        {
            name: 'Roles',
        },
    ],
};

interface HeaderProps {
    className?: string;
}

export default function RolesPageHeader({ className }: HeaderProps) {
    const user = localStorage.getItem('userRole')

    return (
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
            <Link
                href={routes.logistics.createShipment}
                className="w-full @lg:w-auto"
            >
                <Button as="span" className="w-full @lg:w-auto">
                    <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                    Create Role
                </Button>
            </Link>
        </PageHeader>
    );
}
