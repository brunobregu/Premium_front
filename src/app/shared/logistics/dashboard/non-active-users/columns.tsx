import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import UserPlusIcon from '@components/icons/user-plus';

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
  handleActivateUser,
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
              content={t('activate-user.title')}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={t('activate-user.title')}
                onClick={() => handleActivateUser(record.id)}
              >
                <UserPlusIcon className="h-4 w-4" />
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
