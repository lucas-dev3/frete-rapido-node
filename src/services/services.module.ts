import { Module } from '@nestjs/common';
import { FreteRapidoModule } from 'src/infra/data/integrations/frete-rapido/frete-rapido.module';
import { MongoModule } from 'src/infra/data/mongo/mongo.module';

@Module({
  imports: [FreteRapidoModule, MongoModule],
  exports: [FreteRapidoModule, MongoModule],
})
export class ServicesModule {}
