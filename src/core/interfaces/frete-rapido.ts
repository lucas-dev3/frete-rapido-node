export interface FreteRapidoRequest {
  shipper: {
    registered_number: string;
    token: string;
    platform_code: string;
  };
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

export interface FreteRapidoResponse {
  dispatchers: {
    id: string;
    request_id: string;
    registered_number_shipper: string;
    registered_number_dispatcher: string;
    zipcode_origin: number;
    offers: {
      offer: number;
      table_reference: string;
      simulation_type: number;
      carrier: {
        name: string;
        registered_number: string;
        state_inscription: string;
        logo: string;
        reference: number;
        company_name: string;
      };
      service: string;
      delivery_time: {
        days: number;
        estimated_date: string;
      };
      expiration: string;
      cost_price: number;
      final_price: number;
      weights: {
        real: number;
        used: number;
      };
      original_delivery_time: {
        days: number;
        estimated_date: string;
      };
      home_delivery: boolean;
      carrier_original_delivery_time: {
        days: number;
        estimated_date: string;
      };
    }[];
  }[];
}
