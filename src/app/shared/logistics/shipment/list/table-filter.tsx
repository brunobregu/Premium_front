import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PiMagnifyingGlassBold, PiFunnel, PiXBold } from 'react-icons/pi';
import { Button, ActionIcon, Input, Title, Select } from 'rizzui';
import cn from '@utils/class-names';
import { useMedia } from '@hooks/use-media';
import { ToggleColumns } from '@/app/shared/table';
import { useFiltersContext } from '@/store/state';
import axios from 'axios';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});
import { FilterDrawerView } from '../my-list/table-filter';
import premiumApi from '@/util/premiumAPI';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

export type TableFilterProps = {
  searchTerm: string;
  onSearchClear: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: { [key: string]: any }[];
  checkedColumns: string[];
  setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  hideIndex?: number;
  children?: React.ReactNode;
  drawerTitle?: string;
  hasSearched?: boolean;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
};

export default function TableFilter({
  searchTerm,
  onSearchClear,
  onSearchChange,
  columns,
  checkedColumns,
  setCheckedColumns,
  hideIndex,
  drawerTitle = 'Table Filters',
  hasSearched,
  enableDrawerFilter = false,
  showSearchOnTheRight = false,
  menu,
  children,
}: TableFilterProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const { setUserId, userId } = useFiltersContext(); // Access the context
  const [selectedFullname, setSelectedFullname] = useState<string>('');
  const [fullnameOptions, setFullnameOptions] = useState<any>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    // Fetch fullnames and userIds from the API
    const fetchFullnames = async () => {
      try {
        const response = await premiumApi.get('/en/OrderDetails/clientsWithOrders');
        const data = response.data;
        const options = data.map((item: { fullname: string; userId: string }) => ({
          name: item.fullname,
          id: item.userId,
        }));
        setFullnameOptions(data);
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Error, try againg', { position: "top-right" });
      }
    };

    fetchFullnames();
  }, []);


  const handleFullnameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setUserId(selected);
  };

  return (
    <div className=" mb-4 flex items-center justify-between">
      <div className="flex  items-center gap-4">
        {!showSearchOnTheRight ? (
          <div className="flex flex-row gap-3 items-center">
            <p >Select clients</p>
            <select
              value={userId || ""}
              onChange={handleFullnameChange}
              className="form-select w-[300px] h-9 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            >
              <option value={""} className='font-bold'>All clients with orders</option>
              {(fullnameOptions && fullnameOptions?.length > 0) ? fullnameOptions?.map((item: any) => (
                <option key={item.userId} value={item.userId}>
                  {item.fullname.trim()}
                </option>
              )) : null}
            </select>
          </div>
        ) : null}

        {showSearchOnTheRight && enableDrawerFilter ? (
          menu ? menu : null
        ) : null}

        {children && (
          <>
            {isMediumScreen || enableDrawerFilter ? (
              <FilterDrawerView
                isOpen={openDrawer}
                setOpenDrawer={setOpenDrawer}
                drawerTitle={drawerTitle}
                hasSearched={hasSearched}
              >
                {children}
              </FilterDrawerView>
            ) : (
              <>{showFilters ? children : null}</>
            )}
          </>
        )}
      </div>

      <div className="ms-4 flex items-center gap-4">
        {/* Fullname Select */}



        {/* Toggle Filters Button */}
        {children ? (
          <Button
            {...(isMediumScreen || enableDrawerFilter
              ? {
                onClick: () => {
                  setOpenDrawer(() => !openDrawer);
                },
              }
              : { onClick: () => setShowFilters(() => !showFilters) })}
            variant={'outline'}
            className={cn(
              'me-2.5 h-9 pe-3 ps-2.5',
              !(isMediumScreen || enableDrawerFilter) &&
              showFilters &&
              'border-dashed border-gray-700'
            )}
          >
            <PiFunnel className="me-1.5 h-[18px] w-[18px]" strokeWidth={1.7} />
            {!(isMediumScreen || enableDrawerFilter) && showFilters
              ? 'Hide Filters'
              : 'Filters'}
          </Button>
        ) : null}

        {/* Toggle Columns Component */}
        <ToggleColumns
          columns={columns}
          checkedColumns={checkedColumns}
          setCheckedColumns={setCheckedColumns}
          hideIndex={hideIndex}
        />
      </div>
    </div>
  );
}
