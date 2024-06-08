import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { BitcoinPriceModule } from './bitcoin-price/bitcoin-price.module';
import dbConfig from './config/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database')
      }),
    }),
    ScheduleModule.forRoot(),
    BitcoinPriceModule,
  ],
})
export class AppModule {}