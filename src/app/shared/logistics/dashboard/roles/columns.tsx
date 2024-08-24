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
    id: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    lot: number;
    auction: string;
    trackingNumber: string | null;
    carStatus: string;
    port: string;
    clientTotal: number;
    paymentStatus: string;
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
        // {
        //     title: (
        //         <HeaderCell
        //             title="ID"
        //             sortable
        //             ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'id'}
        //         />
        //     ),
        //     onHeaderCell: () => onHeaderCellClick('id'),
        //     dataIndex: 'id',
        //     key: 'id',
        //     width: 180,
        //     render: (id: any) => id,
        // },

        {
            title: (
                <HeaderCell
                    title="Name"
                    sortable
                    ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'name'}
                />
            ),
            onHeaderCell: () => onHeaderCellClick('name'),
            dataIndex: 'name',
            key: 'name',
            width: 80,
            render: (name: any) => name,
        },
        {
            title: <HeaderCell title="Actions" className="text-gray-900 font-medium" />,
            dataIndex: 'action',
            key: 'action',
            width: 70,
            render: (text: any, record: RecordType) => {
                return (
                    <div className="flex items-center justify-start gap-3 pe-4">

                        <Tooltip size="sm" content={'Delete Shipment'} placement="top" color="invert">
                            <ActionIcon
                                size="sm"
                                variant="outline"
                                aria-label={'Delete Shipment'}
                                onClick={() => handleDelete(record.id)}
                            >
                                <TrashIcon className="h-4 w-4" />
                            </ActionIcon>
                        </Tooltip>
                    </div>
                );
            },
            onHeaderCell: () => ({})
        }
    ];

    // if (role === 'Admin' || role === 'Account manager') {
    //   columns.unshift({
    //     title: (
    //       <HeaderCell
    //         title="Full Name"
    //         sortable
    //         ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'fullname'}
    //       />
    //     ),
    //     onHeaderCell: () => onHeaderCellClick('fullname'),
    //     dataIndex: 'fullname',
    //     key: 'fullname',
    //     width: 250,
    //     render: (fullname: any) => fullname,
    //   });
    //   columns.push(
    //     {
    //       title: (
    //         <HeaderCell
    //           title="Total Cost"
    //           sortable
    //           ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'totalCost'}
    //         />
    //       ),
    //       onHeaderCell: () => onHeaderCellClick('totalCost'),
    //       dataIndex: 'totalCost',
    //       key: 'totalCost',
    //       width: 180,
    //       render: (totalCost: any) => totalCost,
    //     },
    //     {
    //       title: (
    //         <HeaderCell
    //           title="Order Id"
    //           sortable
    //           ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'dspOrderID'}
    //         />
    //       ),
    //       onHeaderCell: () => onHeaderCellClick('dspOrderID'),
    //       dataIndex: 'dspOrderID',
    //       key: 'dspOrderID',
    //       width: 150,
    //       render: (dspOrderID: any) => dspOrderID,
    //     }
    //   );
    // }

    // columns.push({
    //   title: <HeaderCell title="Actions" className="text-gray-900 font-medium" />,
    //   dataIndex: 'action',
    //   key: 'action',
    //   width: 120,
    //   render: (text: any, record: any) => {
    //     // Assuming you need the `id` from each `record` for actions
    //     console.log('Row data:', record);
    //     return (
    //       <div className="flex items-center justify-end gap-3 pe-4">
    //         <Tooltip size="sm" content={'Detail Shipment'} placement="top" color="invert">
    //           <Link href={routes.logistics.detailShipment(record.id)}>
    //             <ActionIcon size="sm" variant="outline" aria-label={'Detail Shipment'}>
    //               <EyeIcon className="h-4 w-4" />
    //             </ActionIcon>
    //           </Link>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    //   onHeaderCell: () => ({})
    // })

    return columns;
};
