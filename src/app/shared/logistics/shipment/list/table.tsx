'use client';

import dynamic from 'next/dynamic';
import { PiTrashDuotone } from 'react-icons/pi';
import { useCallback, useMemo, useState } from 'react';
import { Button, Text, Badge } from 'rizzui';
import {
  getColumns,
  statusColors,
} from '@/app/shared/logistics/shipment/list/columns';
import ControlledTable from '@/app/shared/controlled-table/index';
import DateFiled from '@/app/shared/controlled-table/date-field';
import { useMedia } from '@hooks/use-media';
import { useTable } from '@hooks/use-table';
import { getDateRangeStateValues } from '@utils/get-formatted-date';
import StatusField from '@/app/shared/controlled-table/status-field';
import { useColumn } from '@hooks/use-column';
import {
  shipmentData,
  paymentMethods,
  shippingStatuses,
  StatusType,
} from '@/data/shipment-data';
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { ShipmentData } from '@/types/orders';

const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const transformData = (data: ShipmentData[]): ShipmentData[] => {
  return data.map((item: ShipmentData) => {
    return {
      ...item,
      port: item.port.charAt(0).toUpperCase() + item.port.slice(1),
    };
  });
};


export default function ShipmentListTable() {
  const [pageSize, setPageSize] = useState(10);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const user = localStorage.getItem('userRole');

  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const isLargeScreen = useMedia('(min-width: 1861px)', false);

  const query = useQuery({
    queryKey: ['shipments'],
    queryFn: () => {
      if (user === 'Admin') {
        return premiumApi.get('/OrderDetails/orders');
      } else {
        return premiumApi.get('/OrderDetails/myOrders');
      }
    },
    select: (data) => transformData(data.data),
  });

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
    handleReset,
    handleSelectAll,
    handleRowSelect,
    setSelectedRowKeys,
    selectedRowKeys,
  } = useTable(query.data ?? [], pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        data: shipmentData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onHeaderCellClick, sortConfig.key, sortConfig.direction, onChecked]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div>
      <ControlledTable
        variant="modern"
        isLoading={query.isLoading}
        showLoadingText={true}
        data={query.data as any[]}
        scroll={{
          x: 1800,
        }}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: query.data?.length ?? 0,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
