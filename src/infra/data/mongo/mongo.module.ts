import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModel, quoteModelSchema } from './models/quote.model';
import { MongoService } from './mongo.service';
import { DataServices } from 'src/core/abstracts/data.abstract';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      {
        name: QuoteModel.name,
        schema: quoteModelSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: DataServices,
      useClass: MongoService,
    },
  ],
  exports: [DataServices],
})
export class MongoModule {}
