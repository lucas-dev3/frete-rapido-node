export abstract class QuoteRepository<T> {
    abstract createQuote(data: T): Promise<T>;
    abstract findQuotes(): Promise<T[]>;
}