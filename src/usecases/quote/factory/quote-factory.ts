import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';
import { FreteRapidoRequest } from 'src/core/interfaces/frete-rapido';

export class FreteRapidoRequestFactory {
  static createRequest(dto: CreateQuoteDto): FreteRapidoRequest {
    const recipientZipcode = parseInt(dto.recipient.address.zipcode, 10);
    const total_price = dto.volumes.reduce(
      (acc: number, cur: any) => acc + cur.price,
      0,
    );

    return {
      shipper: {
        registered_number: process.env.FR_REGISTERED_NUMBER,
        token: process.env.FR_TOKEN,
        platform_code:  process.env.FR_PLATAFORM_CODE,
      },
      recipient: {
        type: 0,
        registered_number: process.env.FR_REGISTERED_NUMBER,
        country: 'BRA',
        zipcode: recipientZipcode,
      },
      dispatchers: [
        {
          registered_number: process.env.FR_REGISTERED_NUMBER,
          zipcode: recipientZipcode,
          total_price: total_price,
          volumes: dto.volumes.map((volume: any) => ({
            amount: volume.amount,
            category: volume.category.toString(),
            height: volume.height,
            width: volume.width,
            length: volume.length,
            unitary_price: volume.price,
            unitary_weight: volume.unitary_weight,
          })),
        },
      ],
      simulation_type: [0], // Default or static value, can be changed based on requirements
    };
  }
}
