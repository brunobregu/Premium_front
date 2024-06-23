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
    name: 'Logistics',
    href: routes.logistics.dashboard,
    icon: <PiPackageDuotone />,
  },
  {
    name: 'Shipment List',
    href: routes.logistics.shipmentList,
    icon: <PiPackageDuotone />,
  },
];
