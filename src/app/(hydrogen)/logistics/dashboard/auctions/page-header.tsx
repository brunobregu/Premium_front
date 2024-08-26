"use client"


import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
    title: 'Auctions',
    breadcrumb: [
        {
            name: 'Dashborad',
        },
        {
            name: 'Auctions',
        },
    ],
};

interface AuctionsHeaderProps {
    setModalOpen: (value: boolean) => void;
}

export default function PortsPageHeader({ setModalOpen }: AuctionsHeaderProps) {


    return (
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

            <Button as="span" className="cursor-pointer w-full @lg:w-auto" onClick={() => setModalOpen(true)}>
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Create Auction
            </Button>
        </PageHeader>
    );
}
