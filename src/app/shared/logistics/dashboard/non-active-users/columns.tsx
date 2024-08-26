import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import { shippingStatuses, StatusType } from '@/data/shipment-data';
import TrashIcon from '@components/icons/trash';
import UserPlusIcon from '@components/icons/user-plus';


export interface RecordType {
    firstName: string,
    id: string,
    lastNane: string,
    userName: string
    role: string[]
};


export const statusColors = (status: StatusType) => {
    if (shippingStatuses.Approved === status) {
        return 'primary';
    }
    if (shippingStatuses.InTransit === status) {
        return 'secondary';
    }
    if (shippingStatuses.OutForDelivery === status) {
        return 'info';
    }
    if (shippingStatuses.Delivered === status) {
        return 'success';
    }
    if (shippingStatuses.DeliveryFailed === status) {
        return 'danger';
    }
};

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
                    ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'firstName'}
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
                    ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'lastName'}
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
                    ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'userName'}
                />
            ),
            onHeaderCell: () => onHeaderCellClick('userName'),
            dataIndex: 'userName',
            key: 'userName',
            width: 80,
            render: (userName: any) => userName,
        },
        // {
        //     title: (
        //         <HeaderCell
        //             title="Role"
        //             sortable
        //             ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'role'}
        //         />
        //     ),
        //     onHeaderCell: () => onHeaderCellClick('role'),
        //     dataIndex: 'role',
        //     key: 'role',
        //     width: 80,
        //     render: (roles: string[]) => roles?.length ? roles.join(', ') : 'No role',
        // },
        {
            title: <HeaderCell title="Actions" className="text-gray-900 font-medium" />,
            dataIndex: 'action',
            key: 'action',
            width: 70,
            render: (text: any, record: RecordType) => {
                return (
                    <div className="flex items-center justify-start gap-3 pe-4">

                        <Tooltip size="sm" content={'Activate User'} placement="top" color="invert">
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
            onHeaderCell: () => ({})
        }
    ];

    return columns;
};
