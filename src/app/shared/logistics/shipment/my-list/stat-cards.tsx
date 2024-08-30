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
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';




export default function MyDetails({ className }: { className?: string }) {
  const user = localStorage.getItem('userRole') || 'User';
  const { i18n } = useTranslation();
  const { lang, setLang } = useFiltersContext();

  const fetchStatData = async (user: string) => {
    const endpoint = ` ${lang}/OrderDetails/myDetails`;
    // ? '/OrderDetails/details'
    const response = await premiumApi.get<DetailsApiResponse>(endpoint);
    return response.data;
  };

  const defaultStatData: StatData[] = [
    {
      id: '1',
      title: i18n.t("number-of-orders"),
      icon: <ExpenseIcon className="h-7 w-7" />,
      graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
      graphColor: 'text-green',
      metric: i18n.t("not-avaiable"),
      increased: true,
    },
    {
      id: '2',
      title: i18n.t("client-total"),
      icon: <RevenueUpIcon className="h-7 w-7" />,
      graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
      graphColor: 'text-green',
      metric: i18n.t("not-avaiable"),
      increased: true,
    },
    {
      id: '3',
      title: i18n.t("to-be-paid"),
      icon: <SalesIcon className="h-9 w-9" />,
      graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
      graphColor: 'text-green',
      metric: i18n.t("not-avaiable"),
      increased: true,
    },
    {
      id: '4',
      title: i18n.t("paid"),
      icon: <ContainersIcon className="h-7 w-7" />,
      graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
      graphColor: 'text-red',
      metric: i18n.t("not-avaiable"),
      decreased: true,
    },
  ];
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
          title: i18n.t("number-of-orders"),
          icon: <ExpenseIcon className="h-7 w-7" />,
          graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
          graphColor: 'text-green',
          metric: data.numberOfOrders,
          increased: true,
        },
        {
          id: '2',
          title: i18n.t("client-total"),
          icon: <RevenueUpIcon className="h-7 w-7" />,
          graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
          graphColor: 'text-green',
          metric: data.clientTotal,
          increased: true,
        },
        {
          id: '3',
          title: 'To be Paid',
          icon: <SalesIcon className="h-9 w-9" />,
          graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
          graphColor: 'text-green',
          metric: data.toBePaid,
          increased: true,
        },
        {
          id: '4',
          title: 'Paid',
          icon: <ContainersIcon className="h-7 w-7" />,
          graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
          graphColor: 'text-red',
          metric: data.paid,
          decreased: true,
        },
      ];
    },
  });

  if (isLoading || error)
    return (
      <div className="grid grid-flow-col gap-5 pb-1">
        {defaultStatData?.map((stat) => (
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
    );

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="General Overview"
      headerClassName="mb-2 @2xl:mb-5"
    >
      <SimpleBar>
        <div className="grid grid-flow-col gap-5 pb-1">
          {data?.map((stat) => (
            <MetricCard
              key={stat.id}
              title={i18n.t("general-overview")}
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
