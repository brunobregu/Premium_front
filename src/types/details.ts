export interface DetailsApiResponse {
    numberOfOrders: number;
    sumClientTotal: number;
    sumPartlyPaid: number;
    sumToBePaid: number;
  }
  
 export interface StatData {
    id: string;
    title: string;
    icon: JSX.Element;
    graphIcon: JSX.Element;
    graphColor: string;
    metric: number | string;
    increased?: boolean;
    decreased?: boolean;
  }