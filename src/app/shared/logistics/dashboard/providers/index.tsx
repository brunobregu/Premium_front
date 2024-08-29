'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Title, Loader } from 'rizzui';
import cn from '@utils/class-names';
import type { TableFilterProps } from '@/app/shared/logistics/shipment/list/table-filter';
import Table, { TableProps } from '../../../table';
const TableFilter = dynamic(
  () => import('@/app/shared/logistics/shipment/my-list/table-filter'),
  { ssr: false }
);
const TableNameFilter = dynamic(
  () => import('@/app/shared/logistics/shipment/list/table-filter'),
  { ssr: false }
);
const TablePagination = dynamic(
  () => import('@/app/shared/controlled-table/table-pagination'),
  { ssr: false }
);

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: any;
  tableFooter?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
} & TableProps;

export default function ControlledTable({
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  if (isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    );
  }
  return (
    <>
      <div className="relative">
        <Table
          rowKey={(record: any) => record.id}
          className={cn(className)}
          {...tableProps}
        />
        {tableFooter ? tableFooter : null}
      </div>
    </>
  );
}
