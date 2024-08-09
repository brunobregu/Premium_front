import { PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold, PiCaretDoubleLeftBold, PiCaretDoubleRightBold } from 'react-icons/pi';
import { Select } from 'rizzui';
import cn from '@utils/class-names';

import { useFiltersContext } from '@/store/state';

const paginationLimitOptions = [5, 10, 15, 20, 25].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export default function Pagination() {
  const paginatorClassName = 'mt-5 xs:mt-6 sm:mt-7';
  const { pageSize, setPageSize, currentPage, setCurrentPage, totalRecord } = useFiltersContext();
  const totalPages = Math.ceil(totalRecord / pageSize);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={cn(
        'table-pagination flex items-center justify-center sm:justify-between',
        paginatorClassName
      )}
    >
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            'pagination-button px-4 py-2 rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            { 'opacity-50 cursor-not-allowed': currentPage === 1 }
          )}
        >
          <PiCaretDoubleLeftBold className="text-lg" />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'pagination-button px-4 py-2 rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            { 'opacity-50 cursor-not-allowed': currentPage === 1 }
          )}
        >
          <PiCaretLeftBold className="text-lg" />
        </button>
        <span className="page-info text-gray-500 font-medium">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'pagination-button px-4 py-2 rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            { 'opacity-50 cursor-not-allowed': currentPage === totalPages }
          )}
        >
          <PiCaretRightBold className="text-lg" />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            'pagination-button px-4 py-2 rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            { 'opacity-50 cursor-not-allowed': currentPage === totalPages }
          )}
        >
          <PiCaretDoubleRightBold className="text-lg" />
        </button>
      </div>
    </div>
  );
}
