'use client';

import { useEffect, useState } from 'react';
import cn from '@utils/class-names';
import MetricCard from '@components/cards/metric-card';
import WidgetCard from '@components/cards/widget-card';
import ExpenseIcon from '@components/icons/expenses';
import RevenueUpIcon from '@components/icons/revenue-up';
import SalesIcon from '@components/icons/sales';
import ContainersIcon from '@components/icons/containers';
import SimpleBar from '@ui/simplebar';
import DropdownAction from '@components/charts/dropdown-action';
import TrendingUpIcon from '@components/icons/trending-up';
import TrendingDownIcon from '@components/icons/trending-down';
import premiumApi from '@/util/premiumAPI';
import { DetailsApiResponse, StatData } from '@/types/details';



const defaultStatData: StatData[] = [
  {
    id: '1',
    title: 'Orders',
    icon: <ExpenseIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    metric: 'Not available',
    increased: true,
  },
  {
    id: '2',
    title: 'Client Total',
    icon: <RevenueUpIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    metric: 'Not available',
    increased: true,
  },
  {
    id: '3',
    title: 'Partly Paid',
    icon: <SalesIcon className="h-9 w-9" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    metric: 'Not available',
    increased: true,
  },
  {
    id: '4',
    title: 'To Be Paid',
    icon: <ContainersIcon className="h-7 w-7" />,
    graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-red',
    metric: 'Not available',
    decreased: true,
  },
];

const viewOptions = [
  { value: 'today', label: 'Today' },
  { value: 'this-week', label: 'This Week' },
];

export default function StatCards({ className }: { className?: string }) {
  const [statData, setStatData] = useState<StatData[]>(defaultStatData);
  const user = localStorage.getItem('userRole');

  const fetchStatData = async () => {
    try {
      let response;
      if (user === 'Admin') {
        response = await premiumApi.get<DetailsApiResponse>('/OrderDetails/details');
      } else {
        response = await premiumApi.get<DetailsApiResponse>('/OrderDetails/myDetails');
      }

      const data = response.data;

      if (
        data.numberOfOrders === null &&
        data.sumClientTotal === null &&
        data.sumPartlyPaid === null &&
        data.sumToBePaid === null
      ) {
        setStatData(defaultStatData);
      } else {
        setStatData([
          {
            id: '1',
            title: 'Orders',
            icon: <ExpenseIcon className="h-7 w-7" />,
            graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
            graphColor: 'text-green',
            metric: data.numberOfOrders,
            increased: true,
          },
          {
            id: '2',
            title: 'Client Total',
            icon: <RevenueUpIcon className="h-7 w-7" />,
            graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
            graphColor: 'text-green',
            metric: data.sumClientTotal,
            increased: true,
          },
          {
            id: '3',
            title: 'Partly Paid',
            icon: <SalesIcon className="h-9 w-9" />,
            graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
            graphColor: 'text-green',
            metric: data.sumPartlyPaid,
            increased: true,
          },
          {
            id: '4',
            title: 'To Be Paid',
            icon: <ContainersIcon className="h-7 w-7" />,
            graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
            graphColor: 'text-red',
            metric: data.sumToBePaid,
            decreased: true,
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching stat data:', error);
      setStatData(defaultStatData);
    }
  };

  useEffect(() => {
    fetchStatData();
  }, []);

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="General Overview"
      headerClassName="mb-2 @2xl:mb-5"
      action={
        <DropdownAction
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="!z-0"
        />
      }
    >
      <SimpleBar>
        <div className="grid grid-flow-col gap-5 pb-1">
          {statData.map((stat) => (
            <MetricCard
              key={stat.id}
              title={stat.title}
              metric={stat.metric}
              icon={stat.icon}
              className="min-w-[240px] border-0 p-1 @2xl:min-w-[280px] lg:p-1"
              titleClassName="capitalize"
              contentClassName="ps-5"
              iconClassName={cn('@5xl:w-20 @5xl:h-20 h-16 w-16')}
              chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
            >
            </MetricCard>
          ))}
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
