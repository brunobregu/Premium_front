"use client"

import PageHeader from '@/app/shared/page-header';
import { useTranslation } from 'react-i18next';




export default function PortsPageHeader() {
    const { i18n } = useTranslation()
    const pageHeader = {
        title: i18n.t('contacts'),
        breadcrumb: [
            {
                name: i18n.t('dashboard'),
            },
            {
                name: i18n.t('contacts'),
            },
        ],
    };
    return (
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>


        </PageHeader>
    );
}
