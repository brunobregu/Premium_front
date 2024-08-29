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
          title="Message"
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
