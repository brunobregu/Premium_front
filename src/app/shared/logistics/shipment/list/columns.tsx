import { HeaderCell } from '@/app/shared/table';
import { Checkbox, Badge, Tooltip, ActionIcon } from 'rizzui';
import { shippingStatuses, StatusType } from '@/data/shipment-data';
import DateCell from '@ui/date-cell';
import AvatarCard from '@ui/avatar-card';
import Link from 'next/link';
import { routes } from '@/config/routes';
import PencilIcon from '@components/icons/pencil';
import EyeIcon from '@components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
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
}) => [
  {
    title: (
      <HeaderCell
        title="VIN"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'vin'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('vin'),
    dataIndex: 'vin',
    key: 'vin',
    width: 180,
    render: (vin: any) => vin,
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
    render: (make: any) => make,
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
    render: (model: any) => model,
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
    render: (year: any) => year,
  },
  {
    title: (
      <HeaderCell
        title="Lot"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'lot'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('lot'),
    dataIndex: 'lot',
    key: 'lot',
    width: 150,
    render: (lot: any) => lot,
  },
  {
    title: (
      <HeaderCell
        title="DSP Order ID"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dspOrderID'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('dspOrderID'),
    dataIndex: 'dspOrderID',
    key: 'dspOrderID',
    width: 180,
    render: (dspOrderID: any) => dspOrderID,
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
    width: 180,
    render: (port: any) => port,
  },
  {
    title: (
      <HeaderCell
        title="Inland Cargoloop"
        sortable
        ascending={
          sortConfig?.direction === 'asc' &&
          sortConfig?.key === 'inlandCargoloop'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('inlandCargoloop'),
    dataIndex: 'inlandCargoloop',
    key: 'inlandCargoloop',
    width: 150,
    render: (inlandCargoloop: any) => inlandCargoloop,
  },
  {
    title: (
      <HeaderCell
        title="OC Cargoloop"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'ocCargoloop'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('ocCargoloop'),
    dataIndex: 'ocCargoloop',
    key: 'ocCargoloop',
    width: 150,
    render: (ocCargoloop: any) => ocCargoloop,
  },
  {
    title: (
      <HeaderCell
        title="Broker"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'broker'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('broker'),
    dataIndex: 'broker',
    key: 'broker',
    width: 180,
    render: (broker: any) => broker,
  },
  {
    title: (
      <HeaderCell
        title="Storage"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'storage'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('storage'),
    dataIndex: 'storage',
    key: 'storage',
    width: 150,
    render: (storage: any) => storage,
  },
  {
    title: (
      <HeaderCell
        title="Payment Status"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'paymentStatus'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('paymentStatus'),
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 150,
    render: (paymentStatus: any) => paymentStatus,
  },
  {
    title: (
      <HeaderCell
        title="Partly Paid"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'partlyPaid'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('partlyPaid'),
    dataIndex: 'partlyPaid',
    key: 'partlyPaid',
    width: 150,
    render: (partlyPaid: any) => partlyPaid,
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: any, row) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Shipment'}
          placement="top"
          color="invert"
        >
          <Link href={routes.logistics.editShipment(row.id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Shipment'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
      </div>
    ),
  },
];
