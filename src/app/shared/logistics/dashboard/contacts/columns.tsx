import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import { shippingStatuses, StatusType } from '@/data/shipment-data';
import Link from 'next/link';
import { routes } from '@/config/routes';
import PencilIcon from '@components/icons/pencil';
import EyeIcon from '@components/icons/eye';
import TrashIcon from '@components/icons/trash';
import UserPlusIcon from '@components/icons/user-plus';
import { PiPlusBold } from 'react-icons/pi';

export interface RecordType {
    firstName: string,
    lastName: string,
    email: string,
    message: string,
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
    handleDelete,
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
                    ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'email'}
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
                    ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'message'}
                />
            ),
            onHeaderCell: () => onHeaderCellClick('message'),
            dataIndex: 'message',
            key: 'message',
            width: 80,
            render: (message: any) => message,
        },
        // {
        //     title: <HeaderCell title="Actions" className="text-gray-900 font-medium" />,
        //     dataIndex: 'action',
        //     key: 'action',
        //     width: 70,
        //     render: (text: any, record: RecordType) => {
        //         return (
        //             <div className="flex items-center justify-start gap-3 pe-4">

        //                 <Tooltip size="sm" content={'Delete Shipment'} placement="top" color="invert">
        //                     <ActionIcon
        //                         size="sm"
        //                         variant="outline"
        //                         aria-label={'Delete Shipment'}
        //                         onClick={() => handleDelete(record.name)}
        //                     >
        //                         <TrashIcon className="h-4 w-4" />
        //                     </ActionIcon>
        //                 </Tooltip>
        //             </div>
        //         );
        //     },
        //     onHeaderCell: () => ({})
        // }
    ];

    return columns;
};
