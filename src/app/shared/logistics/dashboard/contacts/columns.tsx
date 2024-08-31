import { HeaderCell } from '@/app/shared/table';

export interface RecordType {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
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
            sortConfig?.direction === 'asc' && sortConfig?.key === 'email'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('email'),
      dataIndex: 'email',
      key: 'email',
      width: 80,
      render: (email: any) => email,
    },
    {
      title: (
        <HeaderCell
          title={t('message')}
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'message'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('message'),
      dataIndex: 'message',
      key: 'message',
      width: 80,
      render: (message: any) => message,
    },
  ];

  return columns;
};
