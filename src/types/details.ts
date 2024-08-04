export interface DetailsApiResponse {
    numberOfOrders: number;
    clientTotal: number;
    paid: number;
    toBePaid: number;
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