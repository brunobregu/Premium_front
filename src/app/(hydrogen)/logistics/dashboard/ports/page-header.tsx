"use client"


import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import { useTranslation } from 'react-i18next';

interface PortsHeaderProps {
    setModalOpen: (value: boolean) => void;
}

export default function PortsPageHeader({ setModalOpen }: PortsHeaderProps) {

    const { i18n } = useTranslation()
    const pageHeader = {
        title: i18n.t('ports'),
        breadcrumb: [
            {
                name: i18n.t('dashboard'),
            },
            {
                name: i18n.t('ports')
            },
        ],
    };
    return (
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

            <Button as="span" className="cursor-pointer w-full @lg:w-auto" onClick={() => setModalOpen(true)}>
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                {i18n.t('create-port')}
            </Button>
        </PageHeader>
    );
}
