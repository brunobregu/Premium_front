"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FiltersContextProps {
  selectedClient: number;
  setClient: (value: number) => void;
  selectedLocationType: number;
  setLocationType: (value: number) => void;
  formattedStartDate: string | null;
  formattedEndDate: string | null;
  setFormattedDates: (startDate: string | null, endDate: string | null) => void;
  includeReverse: boolean;
  setIncludeReverse: (value: boolean) => void;
  includeAlongRoute: boolean;
  setIncludeAlongRoute: (value: boolean) => void;
  withoutQuotations: boolean;
  setWithoutQuotations: (value: boolean) => void;
  startPrice: number | null;
  setStartPrice: (value: number | null) => void;
  endPrice: number | null;
  setEndPrice: (value: number | null) => void;
  optionValue: string;
  setOptionValue: (value: string) => void;
  selectedOperatorId: string | null;
  setSelectedOperatorId: (value: string | null) => void;
  checkedCategories: number[];
  setCheckedCategories: (value: number[]) => void;
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedOption: string | null;
  setSelectedOption: (value: string | null) => void;
  sliderValue: number;
  setSliderValue: (value: number) => void;
  selectAllDeparture: boolean;
  setSelectAllDeparture: (value: boolean) => void;
  selectAllArrival: boolean;
  setSelectAllArrival: (value: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedCountryCodesDeparture: string[];
  setSelectedCountryCodesDeparture: (value: string[]) => void;
  selectedCountryCodesArrival: string[];
  setSelectedCountryCodesArrival: (value: string[]) => void;
  checkedReasons: number[];
  setCheckedReasons: (value: number[]) => void;

  searchInput: string;
  setSearchInput: (value: string) => void;
  searchInputArrival: string;
  setSearchInputArrival: (value: string) => void;
  searchTypeValue: number;
  setSearchTypeValue: (value: number) => void;
  user: string,
  setUser: (value: string) => void
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [selectedClient, setSelectedClient] = useState<number>(0);
  const [selectedLocationType, setSelectedLocationType] = useState<number>(0);
  const [formattedStartDate, setFormattedStartDate] = useState<string | null>('');
  const [formattedEndDate, setFormattedEndDate] = useState<string | null>('');
  const [includeReverse, setIncludeReverse] = useState<boolean>(false);
  const [includeAlongRoute, setIncludeAlongRoute] = useState<boolean>(false);
  const [withoutQuotations, setWithoutQuotations] = useState<boolean>(false)
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [endPrice, setEndPrice] = useState<number | null>(null);
  const [optionValue, setOptionValue] = useState<string>("option 1")
  const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(null)
  const [checkedCategories, setCheckedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(20);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCountryCodesDeparture, setSelectedCountryCodesDeparture] = useState<string[]>([]);
  const [selectedCountryCodesArrival, setSelectedCountryCodesArrival] = useState<string[]>([]);
  const [selectAllDeparture, setSelectAllDeparture] = useState<boolean>(false);
  const [selectAllArrival, setSelectAllArrival] = useState<boolean>(false);
  const [checkedReasons, setCheckedReasons] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputArrival, setSearchInputArrival] = useState<string>('');
  const [searchTypeValue, setSearchTypeValue] = useState<number>(1)
  const [user, setUser] = useState<string>('')

  const setClient = (value: number) => {
    setSelectedClient(value);

  };

  const setLocationType = (value: number) => {
    setSelectedLocationType(value)
  }

  const setFormattedDates = (startDate: string | null, endDate: string | null) => {
    setFormattedStartDate(startDate);
    setFormattedEndDate(endDate);
  };



  const contextValue: FiltersContextProps = {
    selectedClient,
    setClient,
    selectedLocationType,
    setLocationType,
    formattedStartDate,
    formattedEndDate,
    setFormattedDates,
    includeReverse,
    setIncludeReverse,
    includeAlongRoute,
    setIncludeAlongRoute,
    withoutQuotations,
    setWithoutQuotations,
    startPrice,
    setStartPrice,
    endPrice,
    setEndPrice,
    optionValue,
    setOptionValue,
    selectedOperatorId,
    setSelectedOperatorId,
    selectedCountryCodesDeparture,
    setSelectedCountryCodesDeparture,
    selectedCountryCodesArrival,
    setSelectedCountryCodesArrival,
    checkedCategories,
    setCheckedCategories,
    selectedTags,
    setSelectedTags,
    priceRange,
    setPriceRange,
    selectedOption,
    setSelectedOption,
    sliderValue,
    setSliderValue,
    selectAllDeparture,
    setSelectAllDeparture,
    selectAllArrival,
    setSelectAllArrival,
    searchValue,
    setSearchValue,
    checkedReasons,
    setCheckedReasons,
    searchInput,
    setSearchInput,
    searchInputArrival,
    setSearchInputArrival,
    searchTypeValue,
    setSearchTypeValue,
    user,
    setUser
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
