declare global {
    interface Window {
      opera: any; // Or a more specific type if needed
      MSStream: any; // Or a more specific type if needed
    }
  }
  
  export {};