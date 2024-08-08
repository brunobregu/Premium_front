
import ShipmentListTable from '@/app/shared/logistics/shipment/list/table';
import ShipmentPageHeader from '@/app/(hydrogen)/logistics/shipments/page-header';
import { metaObject } from '@/config/site.config';
import StatCards from '@/app/shared/logistics/shipment/stat-cards';
import MyOrdersList from '@/app/shared/logistics/shipment/my-list/table';

export const metadata = {
  ...metaObject('Shipments'),
};

export default function LogisticsListPage() {
  // const [user, setUser] = useState<string | null>(null);

  const getRole = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null; // Or handle this scenario as needed
  };

  // Usage in your component or logic
  const user = getRole();

  return (
    <>
      <ShipmentPageHeader />
      <div className="flex flex-col gap-10">
        <StatCards />
        {user === 'Client' ? (
          <MyOrdersList />
        ) : (
          <ShipmentListTable />
        )}
      </div>
    </>
  );
}
