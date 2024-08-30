"use client"


import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import { shipmentData } from '@/data/shipment-data';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { useTranslation } from 'react-i18next';


interface HeaderProps {
  className?: string;
}

export default function ShipmentPageHeader({ className }: HeaderProps) {
  const user = localStorage.getItem('userRole')
  const { i18n } = useTranslation();

  const pageHeader = {
    title: i18n.t("all-shipments"),
    breadcrumb: [
      {
        name: i18n.t("shipment-list"),
      },
    ],
  };



  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      {user && (user === 'Admin' || user === 'Account Manager') && <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">
        <Link
          href={routes.logistics.createShipment}
          className="w-full @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            {i18n.t("create-shipment")}
          </Button>
        </Link>
      </div>}
    </PageHeader>
  );
}
