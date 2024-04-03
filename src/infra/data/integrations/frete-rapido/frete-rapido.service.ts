import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FreteService } from 'src/core/abstracts/services/frete.abstract';
import {
  FreteRapidoRequest,
  FreteRapidoResponse,
} from 'src/core/interfaces/frete-rapido';

@Injectable()
export class FreteRapidoService implements FreteService {
  async calculateFrete(data: FreteRapidoRequest): Promise<FreteRapidoResponse> {


    const response = await axios.post(
      'https://sp.freterapido.com/api/v3/quote/simulate',
      data,
    );

    return response.data;
  }
}
