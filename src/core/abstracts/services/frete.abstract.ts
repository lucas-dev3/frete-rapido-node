import { FreteRapidoRequest, FreteRapidoResponse } from "src/core/interfaces/frete-rapido";

export abstract class FreteService {
  abstract calculateFrete(data: FreteRapidoRequest): Promise<FreteRapidoResponse>;
}