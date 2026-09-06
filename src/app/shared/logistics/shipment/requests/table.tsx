'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal, Select, Textarea, Title } from 'rizzui';
import ControlledTable from '@/app/shared/controlled-table';
import { useColumn } from '@hooks/use-column';
import { useTable } from '@hooks/use-table';
import { getShipmentRequestColumns, ShipmentRequest } from './columns';
import { useFiltersContext } from '@/store/state';
import { useQuery } from '@tanstack/react-query';
import premiumApi from '@/util/premiumAPI';
import { useRouter } from 'next/navigation';

type AcceptanceDetails = {
  inlandPrice: string;
  oceanPrice: string;
  broker: string;
  clientStorage: string;
  carPrice: string;
  inlandCost: string;
  oceanCost: string;
  storageCost: string;
  carCost: string;
  paymentStatus: string;
  partlyPaid: string;
};

const initialAcceptanceDetails: AcceptanceDetails = {
  inlandPrice: '', oceanPrice: '', broker: '0', clientStorage: '0',
  carPrice: '', inlandCost: '', oceanCost: '', storageCost: '0',
  carCost: '', paymentStatus: '', partlyPaid: '0',
};

type ShipmentRequestResponse = Omit<
  ShipmentRequest,
  'id' | 'reason' | 'fullName'
> & {
  reason?: string | null;
  fullName?: string | null;
};

export default function ShipmentRequestsTable() {
  const { t } = useTranslation();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoaded, setRoleLoaded] = useState(false);
  const [dismissedRequestIds, setDismissedRequestIds] = useState<string[]>([]);
  const [requestToAccept, setRequestToAccept] =
    useState<ShipmentRequest | null>(null);
  const [acceptanceDetails, setAcceptanceDetails] =
    useState<AcceptanceDetails>(initialAcceptanceDetails);
  const [requestToReject, setRequestToReject] =
    useState<ShipmentRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const { currentPage, pageSize, setCurrentPage, setTotalRecords, lang } =
    useFiltersContext();
  const requestsQuery = useQuery({
    queryKey: ['shipment-requests', lang, userRole],
    queryFn: () =>
      premiumApi.get<ShipmentRequestResponse[]>(
        `${lang}/OrderDetails/${
          userRole === 'Client'
            ? 'shipmentRequests'
            : 'allShipmentRequests'
        }`
      ),
    select: (response) =>
      response.data.map((request) => ({
        ...request,
        id: request.vin,
        reason: request.reason ?? '',
        fullName: request.fullName ?? '',
      })),
    enabled:
      roleLoaded &&
      (userRole === 'Client' ||
        userRole === 'Admin' ||
        userRole === 'Account Manager'),
    retry: false,
  });

  const requests = useMemo(
    () =>
      (requestsQuery.data ?? []).filter(
        (request) => !dismissedRequestIds.includes(request.id)
      ),
    [requestsQuery.data, dismissedRequestIds, userRole]
  );

  const { searchTerm, handleSearch, sortConfig, handleSort } =
    useTable(requests, requests.length);

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
    setRoleLoaded(true);
  }, []);

  useEffect(() => {
    if (!requestsQuery.isError) return;

    const status = (requestsQuery.error as any)?.response?.status;
    const detail = (requestsQuery.error as any)?.response?.data?.detail;

    if (status === 401) {
      toast.error(t('shipment-requests-unauthorized'), {
        position: 'top-right',
      });
      router.push('/login');
      return;
    }

    toast.error(
      detail ||
        (status === 403
          ? t('shipment-requests-forbidden')
          : t('shipment-requests-load-error')),
      { position: 'top-right' }
    );
  }, [requestsQuery.isError, requestsQuery.error, router, t, userRole]);

  const filteredRequests = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const matchingRequests = term
      ? requests.filter((request) =>
          Object.values(request).some((value) =>
            String(value).toLowerCase().includes(term)
          )
        )
      : requests;

    if (!sortConfig.key) return matchingRequests;

    return [...matchingRequests].sort((first, second) => {
      const firstValue = String(
        first[sortConfig.key as keyof ShipmentRequest]
      );
      const secondValue = String(
        second[sortConfig.key as keyof ShipmentRequest]
      );
      const comparison = firstValue.localeCompare(secondValue, undefined, {
        numeric: true,
      });
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [requests, searchTerm, sortConfig.key, sortConfig.direction]);

  useEffect(() => {
    setTotalRecords(filteredRequests.length);
    const lastPage = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
    if (currentPage > lastPage) setCurrentPage(lastPage);
  }, [filteredRequests.length, pageSize, currentPage, setCurrentPage, setTotalRecords]);

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRequests.slice(start, start + pageSize);
  }, [filteredRequests, currentPage, pageSize]);

  const onHeaderCellClick = (key: string) => ({
    onClick: () => handleSort(key),
  });

  const handleDecision = (
    request: ShipmentRequest,
    decision: 'accepted' | 'rejected'
  ) => {
    setDismissedRequestIds((current) => [...current, request.id]);
    toast.success(
      t(
        decision === 'accepted'
          ? 'shipment-request-accepted'
          : 'shipment-request-rejected'
      ),
      { position: 'top-right' }
    );
  };

  const clientColumns = useMemo(
    () =>
      getShipmentRequestColumns({
        sortConfig,
        onHeaderCellClick,
        onAccept: setRequestToAccept,
        onReject: setRequestToReject,
        isClient: true,
        t,
      }),
    [sortConfig.key, sortConfig.direction, t]
  );

  const adminColumns = useMemo(
    () =>
      getShipmentRequestColumns({
        sortConfig,
        onHeaderCellClick,
        onAccept: setRequestToAccept,
        onReject: setRequestToReject,
        isClient: false,
        t,
      }),
    [sortConfig.key, sortConfig.direction, t]
  );

  const clientColumnState = useColumn(clientColumns);
  const adminColumnState = useColumn(adminColumns);
  const isClient = userRole === 'Client';
  const columns = isClient ? clientColumns : adminColumns;
  const { visibleColumns, checkedColumns, setCheckedColumns } = isClient
    ? clientColumnState
    : adminColumnState;


  const paymentOptions = [
    { label: t('paid'), value: 'Paid' },
    { label: t('not-paid'), value: 'Not Paid' },
    { label: t('partly-paid'), value: 'Partly Paid' },
  ];

  const acceptanceInput = (
    name: keyof AcceptanceDetails,
    label: string
  ) => (
    <Input
      type="number"
      label={label}
      placeholder={label}
      value={acceptanceDetails[name]}
      onChange={(event) =>
        setAcceptanceDetails((current) => ({
          ...current,
          [name]: event.target.value,
        }))
      }
      labelClassName="font-medium text-gray-900"
    />
  );

  const closeAcceptModal = () => {
    setRequestToAccept(null);
    setAcceptanceDetails(initialAcceptanceDetails);
  };

  if (!roleLoaded) return null;

  return (
    <ControlledTable
      simpleFilter
      variant="modern"
      isLoading={requestsQuery.isLoading}
      showLoadingText
      data={paginatedRequests}
      columns={visibleColumns as any}
      scroll={{ x: 1420 }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => handleSearch(''),
        onSearchChange: (event) => handleSearch(event.target.value),
        hasSearched: Boolean(searchTerm),
        columns,
        checkedColumns,
        setCheckedColumns,
      }}
      paginatorOptions={{
        pageSize,
        total: filteredRequests.length,
      }}
      className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      tableFooter={
        <>
        <Modal
          isOpen={Boolean(requestToAccept)}
          onClose={closeAcceptModal}
          customSize="1100px"
          overlayClassName="bg-black/50 backdrop-blur-sm"
          className="z-[9999]"
        >
          <div className="max-h-[85vh] overflow-y-auto p-6">
            <Title as="h3" className="mb-6">
              {t('accept-shipment-request')}
            </Title>
            <h3>{t('client-total')}</h3>
            <hr className="mb-4" />
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {acceptanceInput('inlandPrice', t('inland-price'))}
              {acceptanceInput('oceanPrice', t('ocean-price'))}
              {acceptanceInput('broker', t('broker'))}
              {acceptanceInput('clientStorage', t('client-storage'))}
              {acceptanceInput('carPrice', t('car-price'))}
            </div>
            <h3>{t('total-cost')}</h3>
            <hr className="mb-4" />
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {acceptanceInput('inlandCost', t('inland-cost'))}
              {acceptanceInput('oceanCost', t('ocean-cost'))}
              {acceptanceInput('storageCost', t('storage-cost'))}
              {acceptanceInput('carCost', t('car-cost'))}
            </div>
            <h3>{t('payment-info')}</h3>
            <hr className="mb-4" />
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Select
                label={t('payment-status')}
                options={paymentOptions}
                value={acceptanceDetails.paymentStatus || null}
                onChange={(value) =>
                  setAcceptanceDetails((current) => ({
                    ...current,
                    paymentStatus: value as string,
                  }))
                }
                getOptionValue={(option) => option.value}
                displayValue={(value) =>
                  paymentOptions.find((option) => option.value === value)?.label ?? ''
                }
              />
              {acceptanceInput('partlyPaid', t('partly-paid'))}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeAcceptModal}>
                {t('cancel')}
              </Button>
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => {
                  if (!requestToAccept) return;
                  handleDecision(requestToAccept, 'accepted');
                  closeAcceptModal();
                }}
              >
                {t('confirm-acceptance')}
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={Boolean(requestToReject)}
          onClose={() => {
            setRequestToReject(null);
            setRejectReason('');
          }}
          size="lg"
        >
          <div className="p-6">
            <Title as="h3" className="mb-5">
              {t('reject-shipment-request')}
            </Title>
            <Textarea
              label={t('rejection-reason')}
              placeholder={t('rejection-reason-placeholder')}
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              textareaClassName="min-h-32"
              labelClassName="font-medium text-gray-900"
            />
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setRequestToReject(null);
                  setRejectReason('');
                }}
              >
                {t('cancel')}
              </Button>
              <Button
                color="danger"
                disabled={!rejectReason.trim()}
                onClick={() => {
                  if (!requestToReject || !rejectReason.trim()) return;
                  handleDecision(requestToReject, 'rejected');
                  setRequestToReject(null);
                  setRejectReason('');
                }}
              >
                {t('confirm-rejection')}
              </Button>
            </div>
          </div>
        </Modal>
        </>
      }
    />
  );
}
