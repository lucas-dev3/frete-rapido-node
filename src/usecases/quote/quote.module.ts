import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [QuoteService],
  exports: [QuoteService],
})
export class QuoteModule {}
