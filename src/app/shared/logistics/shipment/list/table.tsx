'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getColumns } from '@/app/shared/logistics/shipment/list/columns';
import ControlledTable from '@/app/shared/controlled-table/index';
import { useMedia } from '@hooks/use-media';
import { useTable } from '@hooks/use-table';
import { useColumn } from '@hooks/use-column';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { ShipmentData } from '@/types/orders';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from '../../../../../components/modals/DeleteOrderModal';
import { useFiltersContext } from '@/store/state';
import { useTranslation } from 'react-i18next';

const transformData = (data: ShipmentData[]): ShipmentData[] => {
  return data.map((item: ShipmentData) => {
    return {
      ...item,
      port: item.port.charAt(0).toUpperCase() + item.port.slice(1),
    };
  });
};

export default function OrderList() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { userId, setCurrentPage, currentPage, pageSize, setTotalRecords, lang } =
    useFiltersContext();

  const query = useQuery({
    queryKey: ['shipments', userId],
    queryFn: () => {
      return premiumApi.get(
        userId.length > 0
          ? `${lang}/OrderDetails/ordersByClient?userId=${userId}`
          : `${lang}/OrderDetails/orders`
      );
    },
    select: (data) => transformData(data.data),
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

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await premiumApi.delete(`${lang}/OrderDetails/delete?id=${id}`);
        queryClient.invalidateQueries({ queryKey: ['shipments'] });
        queryClient.invalidateQueries({ queryKey: ['details'] });
        toast.success(i18n.t('order-delete'), {
          position: 'top-right',
        });
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Error, try againg', {
          position: 'top-right',
        });
      }
    },
    [queryClient]
  );

  const openModal = (id: string) => {
    setCurrentDeleteId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentDeleteId(null);
    setIsOpen(false);
  };

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
        handleDelete: openModal,
        userId: userId,
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
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
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
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (currentDeleteId) {
            handleDelete(currentDeleteId);
          }
        }}
        itemId={currentDeleteId}
      />
    </div>
  );
}
