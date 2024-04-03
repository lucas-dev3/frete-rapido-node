import { Quote } from "../entities/quote.entity";
import { QuoteRepository } from "./repository/quote-repository.abstract";

export abstract class DataServices {
  quote: QuoteRepository<Quote>;
}
