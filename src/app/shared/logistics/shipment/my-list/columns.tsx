import { HeaderCell } from '@/app/shared/table';
import { Tooltip, ActionIcon } from 'rizzui';
import { shippingStatuses, StatusType } from '@/data/shipment-data';
import Link from 'next/link';
import { routes } from '@/config/routes';
import EyeIcon from '@components/icons/eye';

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
}

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  handleDelete,
  t,
}: any) => {
  const columns = [
    {
      title: (
        <HeaderCell
          title={t('vin')}
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
      render: (vin: any) => vin,
    },
    {
      title: (
        <HeaderCell
          title={t('make')}
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
          title={t('model')}
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
          title={t('year')}
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
          title={t('lot')}
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
      render: (lot: any) => lot,
    },
    {
      title: (
        <HeaderCell
          title={t('port')}
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
      render: (port: any) => port,
    },
    {
      title: (
        <HeaderCell
          title={t('auction')}
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
      render: (auction: any) => auction,
    },
    {
      title: (
        <HeaderCell
          title={t('payment-status')}
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
      render: (paymentStatus: any) => paymentStatus,
    },
    {
      title: (
        <HeaderCell
          title={t('car-status')}
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
      render: (carStatus: any) => carStatus,
    },
    {
      title: (
        <HeaderCell
          title={t('tracking-number')}
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
      render: (trackingId: any) => trackingId,
    },
    {
      title: (
        <HeaderCell
          title={t('client-total')}
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
      render: (clientTotal: any) => clientTotal,
    },
    {
      title: (
        <HeaderCell title={t('actions')} className="font-medium text-gray-900" />
      ),
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (text: any, record: RecordType) => {
        return (
          <div className="flex items-center justify-start gap-3 pe-4">
            <Tooltip
              size="sm"
              content={t('detail-shipment')}
              placement="top"
              color="invert"
            >
              <Link href={routes.logistics.detailShipment(record.id)}>
                <ActionIcon
                  size="sm"
                  variant="outline"
                  aria-label={t('detail-shipment')}
                >
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
          </div>
        );
      },
      onHeaderCell: () => ({}),
    },
  ];

  return columns;
};
