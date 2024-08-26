"use client"

import React from "react";
import ContactsPageHeader from './page-header';
import ContactsTable from "@/app/shared/logistics/dashboard/contacts/contacts-table";

export default function ContactsPage() {

    return (
        <>
            <ContactsPageHeader />
            <div className="flex flex-col gap-10">
                <ContactsTable />
            </div>
        </>
    );
}
