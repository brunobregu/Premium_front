import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import PencilIcon from '@components/icons/pencil';
import EyeIcon from '@components/icons/eye';
import TrashIcon from '@components/icons/trash';

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
  fullname: string;
}

export const getColumns = ({
  sortConfig,
  onHeaderCellClick,
  handleDelete,
  userId,
}: any) => {
  const columns = [
    ...(userId.length > 0
      ? []
      : [
          {
            title: (
              <HeaderCell
                title="Full Name"
                sortable
                ascending={
                  sortConfig?.direction === 'asc' &&
                  sortConfig?.key === 'fullname'
                }
              />
            ),
            onHeaderCell: () => onHeaderCellClick('fullname'),
            dataIndex: 'fullname',
            key: 'fullname',
            width: 300,
            render: (fullname: string) => fullname,
          },
        ]),
    {
      title: (
        <HeaderCell
          title="VIN"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'vin'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('vin'),
      dataIndex: 'vin',
      key: 'vin',
      width: 180,
      render: (vin: string) => vin,
    },
    {
      title: (
        <HeaderCell
          title="Make"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'make'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('make'),
      dataIndex: 'make',
      key: 'make',
      width: 180,
      render: (make: string) => make,
    },
    {
      title: (
        <HeaderCell
          title="Model"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'model'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('model'),
      dataIndex: 'model',
      key: 'model',
      width: 180,
      render: (model: string) => model,
    },
    {
      title: (
        <HeaderCell
          title="Year"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'year'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('year'),
      dataIndex: 'year',
      key: 'year',
      width: 100,
      render: (year: number) => year,
    },
    {
      title: (
        <HeaderCell
          title="Lot"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'lot'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('lot'),
      dataIndex: 'lot',
      key: 'lot',
      width: 150,
      render: (lot: number) => lot,
    },
    {
      title: (
        <HeaderCell
          title="Order Id"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'orderID'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('orderID'),
      dataIndex: 'orderID',
      key: 'orderID',
      width: 150,
      render: (orderID: string) => orderID,
    },
    {
      title: (
        <HeaderCell
          title="Auction"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'auction'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('auction'),
      dataIndex: 'auction',
      key: 'auction',
      width: 150,
      render: (auction: string) => auction,
    },
    {
      title: (
        <HeaderCell
          title="Tracking Number"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'trackingNumber'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('trackingNumber'),
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      width: 150,
      render: (trackingNumber: string | null) => trackingNumber || 'N/A',
    },
    {
      title: (
        <HeaderCell
          title="Payment Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'paymentStatus'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('paymentStatus'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 150,
      render: (paymentStatus: string) => paymentStatus,
    },
    {
      title: (
        <HeaderCell
          title="Car Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'carStatus'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('carStatus'),
      dataIndex: 'carStatus',
      key: 'carStatus',
      width: 150,
      render: (carStatus: string) => carStatus,
    },
    {
      title: (
        <HeaderCell
          title="Port"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'port'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('port'),
      dataIndex: 'port',
      key: 'port',
      width: 150,
      render: (port: string) => port,
    },
    {
      title: (
        <HeaderCell
          title="Client Total"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'clientTotal'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('clientTotal'),
      dataIndex: 'clientTotal',
      key: 'clientTotal',
      width: 150,
      render: (clientTotal: number) => clientTotal,
    },
    {
      title: (
        <HeaderCell
          title="Total Cost"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'totalCost'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('totalCost'),
      dataIndex: 'totalCost',
      key: 'totalCost',
      width: 150,
      render: (totalCost: number) => totalCost,
    },
    {
      title: (
        <HeaderCell
          title="Profit"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'profit'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('profit'),
      dataIndex: 'profit',
      key: 'profit',
      width: 150,
      render: (profit: number) => profit,
    },
    {
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (text: any, record: RecordType) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={'Detail Shipment'}
            placement="top"
            color="invert"
          >
            <Link href={routes.logistics.detailShipmentAdmin(record?.id)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Detail Shipment'}
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={'Edit Shipment'}
            placement="top"
            color="invert"
          >
            <Link href={routes.logistics.editShipment(record?.id)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Edit Shipment'}
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={'Delete Shipment'}
            placement="top"
            color="invert"
          >
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
      ),
      onHeaderCell: () => ({}),
    },
  ];

  return columns;
};
