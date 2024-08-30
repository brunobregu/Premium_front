"use client";

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { PiPackageDuotone } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';

export interface MenuItemsType {
  name: string;
  href?: string;
  icon?: JSX.Element;
  dropdownItems?: any[];
}

const useMenuItems = () => {
  const { t, i18n } = useTranslation();
  const [menuItems, setMenuItems] = useState<MenuItemsType[]>([]);
  const { lang, setLang } = useFiltersContext();


  useEffect(() => {
    const userRole = localStorage.getItem('userRole');

    const items: MenuItemsType[] = [
      // label start
      {
        name: i18n.t('overview'),
      },
      ...(userRole === 'Admin' || userRole === 'Account Manager'
        ? [{
          name: i18n.t('dashboard'),
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
                name: i18n.t('roles'),
                href: routes.logistics.roles,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: i18n.t('ports'),
                href: routes.logistics.ports,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: i18n.t('providers'),
                href: routes.logistics.providers,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: i18n.t('auctions'),
                href: routes.logistics.auctions,
                icon: <PiPackageDuotone />,
              }]
              : []),
            ...(userRole === 'Admin' || userRole === 'Account Manager'
              ? [{
                name: i18n.t('contacts'),
                href: routes.logistics.contacts,
                icon: <PiPackageDuotone />,
              }]
              : []),
          ]
        }]
        : []),
      {
        name: i18n.t("shipment-list"),
        href: routes.logistics.shipmentList,
        icon: <PiPackageDuotone />,
      },
    ];

    setMenuItems(items);
  }, [lang]);

  return menuItems;
}

export default useMenuItems;
