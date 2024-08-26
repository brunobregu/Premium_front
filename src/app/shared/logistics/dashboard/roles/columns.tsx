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
    name: string
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

                        <Tooltip size="sm" content={'Delete Role'} placement="top" color="invert">
                            <ActionIcon
                                size="sm"
                                variant="outline"
                                aria-label={'Delete Role'}
                                onClick={() => handleDelete(record.name)}
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

    return columns;
};
