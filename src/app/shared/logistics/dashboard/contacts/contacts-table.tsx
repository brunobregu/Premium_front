'use client';

import { useEffect, useMemo, useState } from 'react';
import { getColumns } from '@/app/shared/logistics/dashboard/contacts/columns';
import ControlledTable from '@/app/shared/logistics/dashboard/contacts/index';
import { useTable } from '@hooks/use-table';
import { useColumn } from '@hooks/use-column';
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { useFiltersContext } from '@/store/state';
import { useTranslation } from 'react-i18next';

export default function ContactsTable() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const { i18n } = useTranslation();
  const {
    searchInput,
    setCurrentPage,
    currentPage,
    pageSize,
    setTotalRecords,
    lang
  } = useFiltersContext();

  const query = useQuery({
    queryKey: ['roles'],
    queryFn: () => {
      return premiumApi.get(`${lang}/Contact/contacts`);
    },
    select: (response) => response.data,
  });

  const filteredData = useMemo(() => {
    if (!query.data) return [];
    return query.data;
  }, [query.data]);

  useEffect(() => {
    if (filteredData) {
      setTotalRecords(filteredData.length);
    }
  }, [filteredData, setTotalRecords]);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  useEffect(() => {

    const totalPages = Math.ceil(filteredData.length / pageSize);

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
    handlePaginate,
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
        t: i18n.t
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onHeaderCellClick, sortConfig.key, sortConfig.direction, onChecked]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  const handleModalSuccess = () => {
    query.refetch(); // Refetch users after creating a new one
  };

  return (
    <div>
      <ControlledTable
        variant="modern"
        isLoading={query.isLoading}
        showLoadingText={true}
        data={paginatedData}
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
        className=" mt-8 rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
