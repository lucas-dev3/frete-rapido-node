import { Module } from '@nestjs/common';
import { HttpModule } from './presentation/http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
})
export class AppModule {}
