"use client"

import PageHeader from '@/app/shared/page-header';

const pageHeader = {
    title: 'Contacts',
    breadcrumb: [
        {
            name: 'Dashborad',
        },
        {
            name: 'Contacts',
        },
    ],
};


export default function PortsPageHeader() {


    return (
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>


        </PageHeader>
    );
}
