import { HeaderCell } from '@/app/shared/table';
import { Button } from 'rizzui';

export type ShipmentRequest = {
  id: string;
  orderDetailsId: number | null;
  vin: string;
  make: string;
  model: string;
  year: number;
  lot: number;
  address: string;
  auction: string;
  port: string;
  fullName: string;
  carStatus: string;
  reason: string;
};

type ColumnOptions = {
  sortConfig: { key?: string; direction?: string };
  onHeaderCellClick: (value: string) => object;
  onAccept: (request: ShipmentRequest) => void;
  onReject: (request: ShipmentRequest) => void;
  isClient: boolean;
  t: (key: string) => string;
};

export function getShipmentRequestColumns({
  sortConfig,
  onHeaderCellClick,
  onAccept,
  onReject,
  isClient,
  t,
}: ColumnOptions) {
  const textColumn = (
    key: keyof ShipmentRequest,
    width: number,
    translationKey: string = key
  ) => ({
    title: (
      <HeaderCell
        title={t(translationKey)}
        sortable
        ascending={sortConfig.direction === 'asc' && sortConfig.key === key}
      />
    ),
    onHeaderCell: () => onHeaderCellClick(key),
    dataIndex: key,
    key,
    width,
  });

  const columns = [
    textColumn('vin', 190),
    textColumn('make', 150),
    textColumn('model', 150),
    textColumn('year', 100),
    textColumn('lot', 120),
    textColumn('address', 220),
    textColumn('auction', 150),
    textColumn('port', 140),
  ];

  if (isClient) {
    return [
      ...columns,
      textColumn('carStatus', 150, 'car-status'),
      textColumn('reason', 240),
    ];
  }

  return [
    ...columns,
    textColumn('fullName', 180, 'full-name'),
    textColumn('carStatus', 160, 'car-status'),
    {
      title: <HeaderCell title={t('actions')} />,
      dataIndex: 'action',
      key: 'action',
      width: 190,
      onHeaderCell: () => ({}),
      render: (_: unknown, request: ShipmentRequest) => {
        if (request.carStatus === 'CompleteDetails') {
          return (
            <Button
              size="sm"
              className="bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => onAccept(request)}
            >
              {t('complete-details')}
            </Button>
          );
        }

        if (request.carStatus === 'Requested') {
          return (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => onAccept(request)}
              >
                {t('accept')}
              </Button>
              <Button
                size="sm"
                color="danger"
                variant="outline"
                onClick={() => onReject(request)}
              >
                {t('reject')}
              </Button>
            </div>
          );
        }

        return null;
      },
    },
  ];
}
