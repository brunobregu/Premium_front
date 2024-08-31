import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import TrashIcon from '@components/icons/trash';
import { useTranslation } from 'react-i18next';

export interface RecordType {
  name: string;
}

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  handleDelete,
  t
}: any) => {

  const columns = [
    {
      title: (
        <HeaderCell
          title={t('activate-user.role-label')}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('name'),
      dataIndex: 'name',
      key: 'name',
      width: 80,
      render: (name: any) => name,
    },
    {
      title: (
        <HeaderCell title={t('actions')} className="font-medium text-gray-900" />
      ),
      dataIndex: 'action',
      key: 'action',
      width: 70,
      render: (text: any, record: RecordType) => {
        return (
          <div className="flex items-center justify-start gap-3 pe-4">
            <Tooltip
              size="sm"
              content={t('delete-role')}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={t('delete-role')}
                onClick={() => handleDelete(record.name)}
              >
                <TrashIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
          </div>
        );
      },
      onHeaderCell: () => ({}),
    },
  ];

  return columns;
};
