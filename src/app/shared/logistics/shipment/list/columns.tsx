import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import { shippingStatuses, StatusType } from '@/data/shipment-data';
import Link from 'next/link';
import { routes } from '@/config/routes';
import PencilIcon from '@components/icons/pencil';
import EyeIcon from '@components/icons/eye';
import TrashIcon from '@components/icons/trash';



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
          title="Port"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'port'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('port'),
      dataIndex: 'port',
      key: 'port',
      width: 150,
      render: (port: any) => port,
    },
    {
      title: (
        <HeaderCell
          title="Auction"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'auction'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('auction'),
      dataIndex: 'auction',
      key: 'auction',
      width: 150,
      render: (auction: any) => auction,
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
          title="Car Status"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'carStatus'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('carStatus'),
      dataIndex: 'carStatus',
      key: 'carStatus',
      width: 150,
      render: (carStatus: any) => carStatus,
    },
    {
      title: (
        <HeaderCell
          title="Tracking Number"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'trackingNumber'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('trackingNumber'),
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      width: 150,
      render: (trackingNumber: any) => trackingNumber,
    },
    {
      title: (
        <HeaderCell
          title="Client Total"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'clientTotal'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('clientTotal'),
      dataIndex: 'clientTotal',
      key: 'clientTotal',
      width: 150,
      render: (clientTotal: any) => clientTotal,
    }
  ];

  columns.unshift({
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
    width: 250,
    render: (fullname: any) => fullname,
  });
  columns.push(
    {
      title: (
        <HeaderCell
          title="Total Cost"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'totalCost'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('totalCost'),
      dataIndex: 'totalCost',
      key: 'totalCost',
      width: 180,
      render: (totalCost: any) => totalCost,
    },
    {
      title: (
        <HeaderCell
          title="Order Id"
          sortable
          ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'dspOrderID'}
        />
      ),
      onHeaderCell: () => onHeaderCellClick('dspOrderID'),
      dataIndex: 'dspOrderID',
      key: 'dspOrderID',
      width: 150,
      render: (dspOrderID: any) => dspOrderID,
    });


  columns.push({
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">

        <>
          <Tooltip size="sm" content={'Edit Shipment'} placement="top" color="invert">
            <Link href={routes.logistics.editShipment(row?.id)}>
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


        {/* <>
            <Tooltip size="sm" content={'Detail Shipment'} placement="top" color="invert">
              <Link href={routes.logistics.detailShipment(row.id)}>
                <ActionIcon size="sm" variant="outline" aria-label={'Detail Shipment'}>
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
          </> */}

      </div>
    ),
    onHeaderCell: () => ({})
  });

  return columns;
};
