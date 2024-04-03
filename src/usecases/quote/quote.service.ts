import { BadRequestException, Injectable } from '@nestjs/common';
// import { DataServices } from 'src/core/abstracts/data.abstract';
import { FreteService } from 'src/core/abstracts/services/frete.abstract';
import { CreateQuoteDto } from 'src/core/dtos/create-quote.dto';
import { FreteRapidoRequestFactory } from './factory/quote-factory';
import { DataServices } from 'src/core/abstracts/data.abstract';
import { Metricas } from 'src/core/interfaces/quote-metrics';

@Injectable()
export class QuoteService {
  constructor(
    private readonly _dataService: DataServices,
    private readonly _freteService: FreteService,
  ) {}

  async createQuote(data: CreateQuoteDto) {
    try {
      const freteRequest = FreteRapidoRequestFactory.createRequest(data);

      // return freteRequest;
      const quoteSimulate =
        await this._freteService.calculateFrete(freteRequest);

      const offers = quoteSimulate.dispatchers.flatMap((dispatcher) => {
        return dispatcher.offers.map((offer) => offer);
      });

      for (const offer of offers) {
        this._dataService.quote.createQuote({
          carrierId: offer.carrier.reference,
          carrierName: offer.carrier.name,
          service: offer.service,
          deadline: offer.delivery_time.days,
          finalPrice: offer.final_price,
        });
      }

      const offersResponse = offers.map((offer) => {
        return {
          carrierName: offer.carrier.name,
          service: offer.service,
          deadline: offer.delivery_time.days,
          price: offer.final_price,
        };
      });

      return offersResponse;
    } catch (error) {
      throw new BadRequestException('Erro ao calcular frete');
    }
  }

  async metrics(lastQuotes?: number) {
    const freightQuotes = await this._dataService.quote.findQuotes();

    // Calcula o frete mais barato e mais caro geral baseado em TODOS os dados
    let freteMaisBaratoGeral = { preco: Infinity, carrierName: '' };
    let freteMaisCaroGeral = { preco: 0, carrierName: '' };
    freightQuotes.forEach((frete) => {
      const { finalPrice, carrierName } = frete;
      if (finalPrice < freteMaisBaratoGeral.preco) {
        freteMaisBaratoGeral = { preco: finalPrice, carrierName };
      }
      if (finalPrice > freteMaisCaroGeral.preco) {
        freteMaisCaroGeral = { preco: finalPrice, carrierName };
      }
    });

    // Limita os dados se lastQuotes for informado
    const lastQuotesData =
      lastQuotes > 0 ? freightQuotes.slice(-lastQuotes) : freightQuotes;

    // Agrupa por transportadora e calcula as métricas com base no limite (lastQuotes)
    let metricasPorTransportadora = {};
    lastQuotesData.forEach((frete) => {
      const { carrierName, finalPrice } = frete;
      if (!metricasPorTransportadora[carrierName]) {
        metricasPorTransportadora[carrierName] = {
          quantidadeResultados: 0,
          totalPrecoFrete: 0,
        };
      }
      metricasPorTransportadora[carrierName].quantidadeResultados++;
      metricasPorTransportadora[carrierName].totalPrecoFrete += finalPrice;
    });

    // Calcula a média do preço do frete por transportadora com base no limite
    Object.keys(metricasPorTransportadora).forEach((key) => {
      const transportadora = metricasPorTransportadora[key];
      transportadora.totalPrecoFrete = parseFloat(
        transportadora.totalPrecoFrete.toFixed(2),
      );
      transportadora.mediaPrecoFrete = parseFloat(
        (
          transportadora.totalPrecoFrete / transportadora.quantidadeResultados
        ).toFixed(2),
      );
    });

    // Retorna as métricas calculadas
    return {
      metricasPorTransportadora,
      freteMaisBaratoGeral: parseFloat(freteMaisBaratoGeral.preco.toFixed(2)),
      freteMaisCaroGeral: parseFloat(freteMaisCaroGeral.preco.toFixed(2)),
      detalhesFreteMaisBaratoGeral: freteMaisBaratoGeral,
      detalhesFreteMaisCaroGeral: freteMaisCaroGeral,
    };
  }
}
