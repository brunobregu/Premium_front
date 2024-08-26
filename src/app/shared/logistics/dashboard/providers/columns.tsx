import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import { shippingStatuses, StatusType } from '@/data/shipment-data';
import TrashIcon from '@components/icons/trash';

export interface RecordType {
    name: string,
    link: string,
    id: number
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
            title: (
                <HeaderCell
                    title="Link"
                    sortable
                    ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'link'}
                />
            ),
            onHeaderCell: () => onHeaderCellClick('link'),
            dataIndex: 'link',
            key: 'link',
            width: 80,
            render: (link: any) => link,
        },
        {
            title: <HeaderCell title="Actions" className="text-gray-900 font-medium" />,
            dataIndex: 'action',
            key: 'action',
            width: 70,
            render: (text: any, record: RecordType) => {
                return (
                    <div className="flex items-center justify-start gap-3 pe-4">

                        <Tooltip size="sm" content={'Delete Providers'} placement="top" color="invert">
                            <ActionIcon
                                size="sm"
                                variant="outline"
                                aria-label={'Delete Providers'}
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

    return columns;
};
