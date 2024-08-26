"use client"

import React, { useState } from "react";
import AuctionsPageHeader from './page-header';
import AuctionsTable from "@/app/shared/logistics/dashboard/auctions/auctions-table";

export default function AuctionsPage() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <AuctionsPageHeader setModalOpen={setModalOpen} />
            <div className="flex flex-col gap-10">
                <AuctionsTable setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
            </div>
        </>
    );
}
