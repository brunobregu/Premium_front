'use client';

import { useMemo, useState } from 'react';
import {
  getColumns,
} from '@/app/shared/logistics/shipment/my-list/columns';
import ControlledTable from '@/app/shared/controlled-table/index';
import { useTable } from '@hooks/use-table';
import { useColumn } from '@hooks/use-column';
import {
  shipmentData,
} from '@/data/shipment-data';
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { MyOrders } from '@/types/my-orders';


const transformData = (data: MyOrders[]): MyOrders[] => {
  return data.map((item: MyOrders) => {
    return {
      ...item,
      port: item.port.charAt(0).toUpperCase() + item.port.slice(1),
    };
  });
};


export default function MyOrdersList() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<string | null>(null);


  const query = useQuery({
    queryKey: ['shipments'],
    queryFn: () => {
      return premiumApi.get('/en/OrderDetails/myOrders');
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
    isFiltered,
    currentPage,
    handlePaginate,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleSelectAll,
    handleRowSelect,
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
        // handleDelete: openModal
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
