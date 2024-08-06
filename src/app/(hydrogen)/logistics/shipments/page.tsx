"use client"

import { useEffect, useState } from 'react';
import ShipmentStats from '@/app/shared/logistics/shipment/shipment-stats';
import ShipmentListTable from '@/app/shared/logistics/shipment/list/table';
import ShipmentPageHeader from '@/app/(hydrogen)/logistics/shipments/page-header';
import { metaObject } from '@/config/site.config';
import StatCards from '@/app/shared/logistics/shipment/stat-cards';
import MyOrdersList from '@/app/shared/logistics/shipment/my-list/table';

// export const metadata = {
//   ...metaObject('Shipments'),
// };

export default function LogisticsListPage() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedUserRole = localStorage.getItem('userRole');
    setUser(storedUserRole);
  }, []);

  return (
    <>
      <ShipmentPageHeader />
      <div className="flex flex-col gap-10">
        <StatCards />
        {user === 'Admin' || user === 'Account manager' ? (
          <ShipmentListTable />
        ) : (
          <MyOrdersList />
        )}
      </div>
    </>
  );
}
