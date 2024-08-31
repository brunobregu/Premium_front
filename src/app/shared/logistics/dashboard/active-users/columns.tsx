import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import TrashIcon from '@components/icons/trash';

export interface RecordType {
  firstName: string;
  id: string;
  lastNane: string;
  userName: string;
  role: string[];
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
          title={t('user-first-name')}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'firstName'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('firstName'),
      dataIndex: 'firstName',
      key: 'firstName',
      width: 80,
      render: (firstName: any) => firstName,
    },
    {
      title: (
        <HeaderCell
          title={t('user-last-name')}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'lastName'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('lastName'),
      dataIndex: 'lastName',
      key: 'lastName',
      width: 80,
      render: (lastName: any) => lastName,
    },
    {
      title: (
        <HeaderCell
          title={t('email-address')}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'userName'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('userName'),
      dataIndex: 'userName',
      key: 'userName',
      width: 80,
      render: (userName: any) => userName,
    },
    {
      title: (
        <HeaderCell
          title={t('activate-user.role-label')}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'role'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('role'),
      dataIndex: 'role',
      key: 'role',
      width: 80,
      render: (roles: string[]) =>
        roles?.length ? roles.join(', ') : 'No roles',
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
              content={t('delete')}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={t('delete')}
                onClick={() => handleDelete(record.id)}
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
