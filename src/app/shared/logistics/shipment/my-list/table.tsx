'use client';

import { useEffect, useMemo, useState } from 'react';
import { getColumns } from '@/app/shared/logistics/shipment/my-list/columns';
import ControlledTable from '@/app/shared/controlled-table/index';
import { useTable } from '@hooks/use-table';
import { useColumn } from '@hooks/use-column';
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { MyOrders } from '@/types/my-orders';
import { useFiltersContext } from '@/store/state';
import { useTranslation } from 'react-i18next';

const transformData = (data: MyOrders[]): MyOrders[] => {
  return data.map((item: MyOrders) => {
    return {
      ...item,
      port: item.port.charAt(0).toUpperCase() + item.port.slice(1),
    };
  });
};

export default function MyOrdersList() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<string | null>(null);
  const { lang, setLang } = useFiltersContext();
  const { i18n } = useTranslation();
  const {
    searchInput,
    setCurrentPage,
    currentPage,
    pageSize,
    setTotalRecords,
  } = useFiltersContext();

  const query = useQuery({
    queryKey: ['shipments'],
    queryFn: () => {
      return premiumApi.get(`${lang}/OrderDetails/myOrders`);
    },
    select: (data) => transformData(data.data),
  });

  const filteredData = useMemo(() => {
    if (!query.data) return [];

    // Apply filtering logic based on the search term from context
    const result = query.data.filter((item) => {
      return (
        item.make.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.model.toLowerCase().includes(searchInput.toLowerCase()) ||
        (item.trackingNumber &&
          item.trackingNumber.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });

    // Set the total number of records based on the filtered data
    setTotalRecords(result.length);

    return result;
  }, [query.data, searchInput]);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  useEffect(() => {
    // Calculate new total pages
    const totalPages = Math.ceil(filteredData.length / pageSize);

    // If the current page is greater than the total pages, reset to the last page
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 || currentPage === 0) {
      // Handle case when there are no pages
      setCurrentPage(1);
    }
  }, [pageSize, filteredData.length, setCurrentPage]);

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
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleSelectAll,
    handleRowSelect,
    selectedRowKeys,
  } = useTable(paginatedData, pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        data: paginatedData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
        // handleDelete: openModal
        t: i18n.t
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
        data={paginatedData}
        scroll={{
          x: 1800,
        }}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          total: paginatedData.length,

          // onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event: any) => {
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
