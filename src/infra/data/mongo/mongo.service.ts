import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import { DataServices } from 'src/core/abstracts/data.abstract';
import { QuoteModel } from './models/quote.model';
import { InjectModel } from '@nestjs/mongoose';
import { QuoteRepositoryService } from './repository/quote-repository.service';
import { QuoteRepository } from 'src/core/abstracts/repository/quote-repository.abstract';
import { Quote } from 'src/core/entities/quote.entity';

@Injectable()
export class MongoService implements DataServices, OnApplicationBootstrap {
  quote: QuoteRepository<Quote>;

  constructor(
    @InjectModel(QuoteModel.name)
    private readonly quoteRepository: Model<QuoteModel>,
  ) {}

  onApplicationBootstrap() {
    this.quote = new QuoteRepositoryService(this.quoteRepository);
  }
}
