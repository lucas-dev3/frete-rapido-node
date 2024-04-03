import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuoteDto } from '../../core/dtos/create-quote.dto';
import { QuoteService } from 'src/usecases/quote/quote.service';

@ApiTags('Quote')
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async createQuote(@Body() body: CreateQuoteDto) {
    return await this.quoteService.createQuote(body);
  }

  @Get()
  async aux(@Query('last_quotes') lastQuotes: string) {
    return await this.quoteService.metrics(parseInt(lastQuotes));
  }
}
