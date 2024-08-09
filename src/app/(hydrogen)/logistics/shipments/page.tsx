"use client"

import { useFiltersContext } from '@/store/state'; // Check import path
import ShipmentPageHeader from './page-header';
import MyOrdersList from '@/app/shared/logistics/shipment/my-list/table';
import React, { useEffect, useState } from "react";
import OrderList from '@/app/shared/logistics/shipment/list/table';
import MyDetails from '@/app/shared/logistics/shipment/my-list/stat-cards';
import Details from '@/app/shared/logistics/shipment/list/stat-cards';

export default function LogisticsListPage() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedUserRole = localStorage.getItem('userRole');
    setUser(storedUserRole);
  }, [user]);

  return (
    <>
      <ShipmentPageHeader />
      <div className="flex flex-col gap-10">
        {user === 'Client' ? (
          <>
            <MyDetails />
            <MyOrdersList />
          </>
        ) : (
          <>
            <Details />
            <OrderList />
          </>
        )}
      </div>
    </>
  );
}
