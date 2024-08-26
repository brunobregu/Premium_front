"use client"

import React, { useState } from "react";
import ActiveUsersPageHeader from './page-header';
import ActiveUsersTable from "@/app/shared/logistics/dashboard/active-users/active-users-table";

export default function ActiveUsersPage() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <ActiveUsersPageHeader setModalOpen={setModalOpen} />
            <div className="flex flex-col gap-10">
                <ActiveUsersTable setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
            </div>
        </>
    );
}
