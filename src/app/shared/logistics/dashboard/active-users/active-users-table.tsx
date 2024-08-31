'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getColumns } from '@/app/shared/logistics/dashboard/active-users/columns';
import ControlledTable from '@/app/shared/logistics/dashboard/active-users/index';
import { useTable } from '@hooks/use-table';
import { useColumn } from '@hooks/use-column';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { useFiltersContext } from '@/store/state';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from '@/components/modals/DeleteOrderModal';
import AddActiveUserModal from '@/components/modals/AddActiveUserModal';
import { useTranslation } from 'react-i18next';

interface ActiveUsersTableProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export default function ActiveUsersTable({
  isModalOpen,
  setModalOpen,
}: ActiveUsersTableProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { i18n } = useTranslation()
  const [currentDeleteActiveUser, setCurrentDeleteActiveUser] = useState<
    string | null
  >(null);
  const {
    searchInput,
    setCurrentPage,
    currentPage,
    pageSize,
    setTotalRecords,
  } = useFiltersContext();
  const queryClient = useQueryClient();
  const { lang, setLang } = useFiltersContext();

  const query = useQuery({
    queryKey: ['active-users'],
    queryFn: () => {
      return premiumApi.get(`${lang}/User/activeUsers`);
    },
    select: (response) => response.data,
  });

  const filteredData = useMemo(() => {
    if (!query.data) return [];

    // Apply filtering logic based on the search term from context
    const result = query.data.filter((item: any) => {
      return (
        item.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        (item.username &&
          item.username.toLowerCase().includes(searchInput.toLowerCase())) ||
        (item.role[0] &&
          item.role[0].toLowerCase().includes(searchInput.toLowerCase()))
      );
    });

    return result;
  }, [query.data, searchInput]);

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

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await premiumApi.delete(`${lang}/User/deleteUser?userId=${id}`);
        toast.success(i18n.t('user-deleted'), { position: 'top-right' });
        queryClient.invalidateQueries({ queryKey: ['active-users'] });
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Error, try againg', {
          position: 'top-right',
        });
      }
    },
    [queryClient]
  );

  const openModal = (id: string) => {
    setCurrentDeleteActiveUser(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentDeleteActiveUser(null);
    setIsOpen(false);
  };

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
      <AddActiveUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
      />

      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (currentDeleteActiveUser) {
            handleDelete(currentDeleteActiveUser);
          }
        }}
        itemId={currentDeleteActiveUser}
      />
    </div>
  );
}
