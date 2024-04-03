import { Module } from '@nestjs/common';
import { QuoteController } from './controllers/quote.controller';
import { QuoteModule } from 'src/usecases/quote/quote.module';

@Module({
  imports: [QuoteModule],
  controllers: [QuoteController],
})
export class HttpModule {}
