import { PiCaretDownBold } from 'react-icons/pi';
import Pagination from '@ui/pagination';
import { Select } from 'rizzui';
import cn from '@utils/class-names';
import { useFiltersContext } from '@/store/state';
import { useTranslation } from 'react-i18next';

const paginationLimitOptions = [5, 10, 15, 20, 25].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export default function TablePagination() {
  const paginatorClassName = 'mt-5 xs:mt-6 sm:mt-7'
  const { pageSize, setPageSize } = useFiltersContext();
  const { i18n } = useTranslation();
  return (
    <div
      className={cn(
        'table-pagination flex items-center justify-center sm:justify-between',
        paginatorClassName
      )}
    >

      <div className="hidden items-center sm:flex">
        {i18n.t("rows-per-page")}
        <Select
          options={paginationLimitOptions}
          onChange={setPageSize}
          size="sm"
          variant="flat"
          value={pageSize}
          getOptionValue={({ value }) => value}
          suffix={<PiCaretDownBold />}
          dropdownClassName="!p-1.5 border w-12 border-gray-100 !z-10 shadow-lg dropdownClassName"
          className="ms-1 w-auto [&_button]:font-medium"
          optionClassName="px-1"
        />
      </div>
      <Pagination />
    </div>
  );
}
