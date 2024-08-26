"use client"

import React, { useState } from "react";
import PortsPageHeader from './page-header';
import PortsTable from "@/app/shared/logistics/dashboard/ports/ports-table";

export default function PortsPage() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <PortsPageHeader setModalOpen={setModalOpen} />
            <div className="flex flex-col gap-10">
                <PortsTable setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
            </div>
        </>
    );
}
