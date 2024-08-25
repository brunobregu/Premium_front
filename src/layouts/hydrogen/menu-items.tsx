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
      ...(userRole === 'Admin' || userRole === 'Account manager'
        ? [{
          name: 'Dashboard',
          href: "#",
          icon: <PiPackageDuotone />,
          dropdownItems: [
            {
              name: 'Users',
              href: routes.logistics.users,
              icon: <PiPackageDuotone />,
            },
            ...(userRole === 'Admin'
              ? [{
                name: 'Roles',
                href: routes.logistics.roles,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account manager'
              ? [{
                name: 'Ports',
                href: routes.logistics.ports,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account manager'
              ? [{
                name: 'Providers',
                href: routes.logistics.providers,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account manager'
              ? [{
                name: 'Auctions',
                href: routes.logistics.auctions,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account manager'
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
