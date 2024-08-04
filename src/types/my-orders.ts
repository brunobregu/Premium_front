export interface MyOrders {
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
    trackingNumber: string;
    clientTotal: number;
    // ocCargoloop: number;
    // broker: number;
    // inlandDspch: number;
    // ocCost: number;
    // storage: number;
    // partlyPaid: number;
    // fullname: string;
  }