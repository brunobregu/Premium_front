"use client"

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import CreateEditShipment from '@/app/shared/logistics/shipment/create-edit';
import { shipmentData as fakeShipmentData } from '@/app/shared/logistics/shipment/create-edit/form-utils';
import premiumApi from '@/util/premiumAPI';
import ViewShipment from '@/app/shared/logistics/shipment/details';

type Props = {
  params: { id: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const id = params.id;

//   return metaObject(`Edit ${id}`);
// }

const pageHeader = {
  title: 'Edit Shipment',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Dashboard',
    },
    {
      href: routes.logistics.shipmentList,
      name: 'Shipments',
    },
    {
      name: 'Edit Shipment',
    },
  ],
};

export default function EditShipmentsPage({
  params,
}: {
  params: { id: string };
}) {
  const [shipmentData, setShipmentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await premiumApi.get(`en/OrderDetails/myOrderDetailsById?id=${params.id}`);
        setShipmentData(response.data);
      } catch (error) {
        console.error('Error fetching shipment data:', error);
        setShipmentData(fakeShipmentData); // Use fake data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentData();
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log('shipmentData', shipmentData)
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title={'Import File'} /> */}
      </PageHeader>

      <ViewShipment id={params.id} shipment={shipmentData} />
    </>
  );
}
