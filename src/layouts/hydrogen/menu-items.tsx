"use client";

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { PiPackageDuotone } from 'react-icons/pi';

export interface MenuItemsType {
  name: string;
  href?: string;
  icon?: JSX.Element;
  dropdownItems?: any[];
}

const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItemsType[]>([]);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');

    const items: MenuItemsType[] = [
      // label start
      {
        name: 'Overview',
      },
      ...(userRole === 'Admin' || userRole === 'Account Manager'
        ? [{
          name: 'Dashboard',
          href: "#",
          icon: <PiPackageDuotone />,
          dropdownItems: [
            // ...(userRole === 'Admin'
            //   ? [{
            //     name: 'Active Users',
            //     href: routes.logistics.activeUsers,
            //     icon: <PiPackageDuotone />,
            //   }]
            //   : []),
            // ...(userRole === 'Admin'
            //   ? [{
            //     name: 'Non-Active Users',
            //     href: routes.logistics.nonActiveUsers,
            //     icon: <PiPackageDuotone />,
            //   }]
            //   : []),
            ...(userRole === 'Admin'
              ? [{
                name: 'Roles',
                href: routes.logistics.roles,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: 'Ports',
                href: routes.logistics.ports,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: 'Providers',
                href: routes.logistics.providers,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: 'Auctions',
                href: routes.logistics.auctions,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: 'Contacts',
                href: routes.logistics.contacts,
                icon: <PiPackageDuotone />,
              }]
              : []),
          ]
        }]
        : []),
      {
        name: 'Shipment List',
        href: routes.logistics.shipmentList,
        icon: <PiPackageDuotone />,
      },
    ];

    setMenuItems(items);
  }, []);

  return menuItems;
}

export default useMenuItems;
