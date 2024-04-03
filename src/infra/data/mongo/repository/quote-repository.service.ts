import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { QuoteRepository } from 'src/core/abstracts/repository/quote-repository.abstract';

@Injectable()
export class QuoteRepositoryService<T> implements QuoteRepository<T> {
  constructor(private readonly repository: Model<T>) {}

  async createQuote(data: T): Promise<T> {
    return await this.repository.create(data);
  }

  async findQuotes(): Promise<T[]> {
    // como as metricas informadas são:

    //  O frete mais barato *geral*;
    //  O frete mais caro *geral*;

    // não coloquei o limit para trazer os dados, pois acredito que o objetivo é trazer todos os dados e mapear via regra de negocio.
    return await this.repository.find().sort({ createdAt: -1 });
  }
}
