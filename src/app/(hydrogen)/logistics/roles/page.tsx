"use client"

import React, { useState } from "react";
import RolesPageHeader from './page-header';
import RolesTable from '@/app/shared/logistics/dashboard/roles/roles-table';

export default function RolesPage() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <RolesPageHeader setModalOpen={setModalOpen} />
            <div className="flex flex-col gap-10">
                <RolesTable setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
            </div>
        </>
    );
}
