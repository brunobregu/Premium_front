import { routes } from '@/config/routes';
import { PiPackageDuotone } from 'react-icons/pi';

export interface MenuItemsType {
  name: string;
  href?: string;
  icon?: JSX.Element;
  dropdownItems?: any[];
}

// Note: do not add href in the label object, it is rendering as label
export const menuItems: MenuItemsType[] = [
  // label start
  {
    name: 'Overview',
  },
  {
    name: 'Dashboard',
    href: "#",
    icon: <PiPackageDuotone />,
    dropdownItems: [
      {
        name: 'Users',
        href: routes.logistics.users,
        icon: <PiPackageDuotone />,
      },
      ...(localStorage.getItem('userRole') === 'Admin'
        ? [{
          name: 'Roles',
          href: routes.logistics.roles,
          icon: <PiPackageDuotone />,
        }]
        : []),
      ...(localStorage.getItem('userRole') === 'Admin' || localStorage.getItem('userRole') === 'Account manager'
        ? [{
          name: 'Ports',
          href: routes.logistics.ports,
          icon: <PiPackageDuotone />,
        }]
        : []),
      ...(localStorage.getItem('userRole') === 'Admin' || localStorage.getItem('userRole') === 'Account manager'
        ? [{
          name: 'Providers',
          href: routes.logistics.providers,
          icon: <PiPackageDuotone />,
        }]
        : []),
      ...(localStorage.getItem('userRole') === 'Admin' || localStorage.getItem('userRole') === 'Account manager'
        ? [{
          name: 'Auctions',
          href: routes.logistics.auctions,
          icon: <PiPackageDuotone />,
        }]
        : []),
      ...(localStorage.getItem('userRole') === 'Admin' || localStorage.getItem('userRole') === 'Account manager'
        ? [{
          name: 'Contacts',
          href: routes.logistics.contacts,
          icon: <PiPackageDuotone />,
        }]
        : []),
    ]
  },
  {
    name: 'Shipment List',
    href: routes.logistics.shipmentList,
    icon: <PiPackageDuotone />,
  },
];
