"use client"


import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
    title: 'Non Active Users',
    breadcrumb: [
        {
            name: 'Dashborad',
        },
        {
            name: 'Non Active Users',
        },
    ],
};

interface ActiveUsersPageHeaderProps {
    setModalOpen: (value: boolean) => void;
}

export default function NonActiveUsersPageHeader({ setModalOpen }: ActiveUsersPageHeaderProps) {


    return (
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

            {/* <Button as="span" className="cursor-pointer w-full @lg:w-auto" onClick={() => setModalOpen(true)}>
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Create User
            </Button> */}
        </PageHeader>
    );
}
