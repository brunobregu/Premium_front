import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import ImportButton from '@/app/shared/import-button';
import CreateEditShipment from '@/app/shared/logistics/shipment/create-edit';

export const metadata = {
  ...metaObject('Create Shipment'),
};

const pageHeader = {
  title: 'Create Shipment',
  breadcrumb: [
    {
      href: routes.logistics.shipmentList,
      name: 'Shipments list',
    },
    {
      name: 'Edit Shipment',
    },
  ],
};

export default function CreateShipmentPage({ params }: { params: { id: string } }) {

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditShipment id={params.id} />
    </>
  );
}
