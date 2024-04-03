interface Shipper {
    registered_number: string;
    token: string;
    platform_code: string;
    
}

export class FreteRapidoRequestDto {
  shipper: Shipper
  recipient: {
    type: number;
    registered_number: string;
    country: string;
    zipcode: number;
  };
  dispatchers: {
    registered_number: string;
    zipcode: number;
    total_price: number;
    volumes: {
      amount: number;
      category: string;
      height: number;
      width: number;
      length: number;
      unitary_price: number;
      unitary_weight: number;
    }[];
  }[];
  simulation_type: number[];
}
