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
}: any) => {
  const columns = [
    {
      title: (
        <HeaderCell
          title="First Name"
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
          title="Last Name"
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
          title="Email"
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
        <HeaderCell title="Actions" className="font-medium text-gray-900" />
      ),
      dataIndex: 'action',
      key: 'action',
      width: 70,
      render: (text: any, record: RecordType) => {
        return (
          <div className="flex items-center justify-start gap-3 pe-4">
            <Tooltip
              size="sm"
              content={'Activate User'}
              placement="top"
              color="invert"
            >
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Activate User'}
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
