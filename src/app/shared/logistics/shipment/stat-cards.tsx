'use client';

import { useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';

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
    title: 'Paid',
    icon: <SalesIcon className="h-9 w-9" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    metric: 'Not available',
    increased: true,
  },
  {
    id: '4',
    title: 'Not Paid',
    icon: <ContainersIcon className="h-7 w-7" />,
    graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-red',
    metric: 'Not available',
    decreased: true,
  },
];

// const viewOptions = [
//   { value: 'today', label: 'Today' },
//   { value: 'this-week', label: 'This Week' },
// ];

const fetchStatData = async (user: string) => {
  const endpoint = user === 'Admin'
    ? '/OrderDetails/details'
    : '/OrderDetails/myDetails';

  const response = await premiumApi.get<DetailsApiResponse>(endpoint);
  return response.data;
};

export default function StatCards({ className }: { className?: string }) {
  const user = localStorage.getItem('userRole') || 'User';

  const { data, error, isLoading } = useQuery({
    queryKey: ['details', user],
    queryFn: () => fetchStatData(user),
    select: (data) => {
      if (
        data.numberOfOrders === undefined &&
        data.clientTotal === undefined &&
        data.paid === undefined &&
        data.toBePaid === undefined
      ) {
        return defaultStatData;
      }

      return [
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
          metric: data.clientTotal,
          increased: true,
        },
        {
          id: '3',
          title: 'Paid',
          icon: <SalesIcon className="h-9 w-9" />,
          graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
          graphColor: 'text-green',
          metric: data.paid,
          increased: true,
        },
        {
          id: '4',
          title: 'Not Paid',
          icon: <ContainersIcon className="h-7 w-7" />,
          graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
          graphColor: 'text-red',
          metric: data.toBePaid,
          decreased: true,
        },
      ];
    },
  });

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="General Overview"
      headerClassName="mb-2 @2xl:mb-5"
      // action={
      //   <DropdownAction
      //     options={viewOptions}
      //     onChange={handleChange}
      //     dropdownClassName="!z-0"
      //   />
      // }
    >
      <SimpleBar>
        <div className="grid grid-flow-col gap-5 pb-1">
          {data?.map((stat) => (
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
            />
          ))}
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
