"use client"

import React, { useState } from "react";
import ProvidersPageHeader from './page-header';
import ProvidersTable from "@/app/shared/logistics/dashboard/providers/providers-table";

export default function ProvidersPage() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <ProvidersPageHeader setModalOpen={setModalOpen} />
            <div className="flex flex-col gap-10">
                <ProvidersTable setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
            </div>
        </>
    );
}
