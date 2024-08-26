"use client"

import React, { useState } from "react";
import NonActiveUsersPageHeader from './page-header';
import NonActiveUsersTable from "@/app/shared/logistics/dashboard/non-active-users/non-active-user-table";

export default function AuctionsPage() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <NonActiveUsersPageHeader setModalOpen={setModalOpen} />
            <div className="flex flex-col gap-10">
                <NonActiveUsersTable setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
            </div>
        </>
    );
}
