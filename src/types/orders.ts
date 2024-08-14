export interface ShipmentData {
    id: number;
    vin: string;
    make: string;
    model: string;
    lot: number;
    dspOrderID: string;
    port: string;
    inlandCargoloop: number;
    ocCargoloop: number;
    broker: number;
    inlandDspch: number;
    ocCost: number;
    storage: number;
    paymentStatus: string;
    partlyPaid: number;
    fullname: string;
  }



   export interface ShipmentDataAdmin  {
    id: number;
    vin: string;
    make: string;
    model: string;
    lot: number;
    dspOrderID: string;
    port: string;
    inlandCargoloop: number;
    ocCargoloop: number;
    broker: number;
    inlandDspch: number;
    ocCost: number;
    storage: number;
    paymentStatus: string;
    partlyPaid: number;
    fullname: string;
    userId:string
  }
 

  