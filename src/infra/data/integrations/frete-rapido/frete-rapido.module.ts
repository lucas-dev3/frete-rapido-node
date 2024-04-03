import { Module } from '@nestjs/common';
import { FreteService } from 'src/core/abstracts/services/frete.abstract';
import { FreteRapidoService } from './frete-rapido.service';

@Module({
  providers: [
    {
      provide: FreteService,
      useClass: FreteRapidoService,
    },
  ],
  exports: [FreteService],
})
export class FreteRapidoModule {}
