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
import TrashIcon from '@components/icons/trash';

// Get user role from local storage
const role = localStorage.getItem('userRole');

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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'make'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'model'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'year'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'dspOrderID'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'port'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'inlandCargoloop'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'ocCargoloop'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'broker'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'storage'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'paymentStatus'}
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
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'partlyPaid'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('partlyPaid'),
      dataIndex: 'partlyPaid',
      key: 'partlyPaid',
      width: 150,
      render: (partlyPaid: any) => partlyPaid,
    },
  ];

  if (role === 'Admin' || role === 'Account manager') {
    columns.push({
      title: (
        <HeaderCell
          title="Full Name"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'fullname'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('fullname'),
      dataIndex: 'fullname',
      key: 'fullname',
      width: 150,
      render: (fullname: any) => fullname,
    });
  }

  columns.push({
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: any, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {(role === 'Admin' || role === 'Account manager') && (
          <>
            <Tooltip size="sm" content={'Edit Shipment'} placement="top" color="invert">
              <Link href={routes.logistics.editShipment(row.id)}>
                <ActionIcon size="sm" variant="outline" aria-label={'Edit Shipment'}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip size="sm" content={'Delete Shipment'} placement="top" color="invert">
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Delete Shipment'}
                onClick={() => handleDelete(row.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
          </>
        )}
      </div>
    ),
  });

  return columns;
};
