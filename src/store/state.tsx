"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FiltersContextProps {

  searchInput: string;
  setSearchInput: (value: string) => void;
  user: string,
  setUser: (value: string) => void
  pageSize: number,
  setPageSize: (value: number) => void
  currentPage: number,
  setCurrentPage: (value: number) => void,
  totalRecord: number,
  setTotalRecords: (value: number) => void,
  userId: string,
  setUserId: (string: any) => void
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {

  const [searchInput, setSearchInput] = useState<string>('');
  const [user, setUser] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecord, setTotalRecords] = useState<any>();
  const [userId, setUserId] = useState<string>('');



  const contextValue: FiltersContextProps = {
    searchInput,
    setSearchInput,
    user,
    setUser,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalRecord,
    setTotalRecords,
    userId,
    setUserId
  };

  return <FiltersContext.Provider value={contextValue}>{children}</FiltersContext.Provider>;
};

export const useFiltersContext = (): FiltersContextProps => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useRadioContext must be used within a RadioProvider');
  }
  return context;
};
