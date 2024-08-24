"use client"


import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';

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

interface RoleHeaderProps {
    setModalOpen: (value: boolean) => void;
}

export default function RolesPageHeader({ setModalOpen }: RoleHeaderProps) {


    return (
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

            <Button as="span" className="cursor-pointer w-full @lg:w-auto" onClick={() => setModalOpen(true)}>
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Create Role
            </Button>
        </PageHeader>
    );
}
