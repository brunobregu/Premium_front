export interface OrderDetails {
    id: number;
    vin: string;
    make: string;
    model: string;
    year: number;
    lot: number;
    port: string;
    auction: string;
    paymentStatus: string;
    carStatus: string;
    link: string;
    trackingNumber: string;
    //clientTotal: number;
    // ocCargoloop: number;
    broker: number;
    inlandPrice: number;
    oceanPrice: number;
    storage: number;
    partlyPaid: number;
    // fullname: string;
  }