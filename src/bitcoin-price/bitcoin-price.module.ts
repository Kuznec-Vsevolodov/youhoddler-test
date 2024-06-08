import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { BitcoinPriceController } from './application/controllers/bitcoin-price.controller';
import { BitcoinPrice } from './infrastructure/entities/bitcoin-price.entity';
import { FetchBitcoinPriceHandler } from './domain/handler/fetch-bitcoin-price.handler';
import { SaveBitcoinPriceHandler } from './domain/handler/save-bitcoin-price.handler';
import { BitcoinPriceSaga } from './domain/services/bitcoin-price.saga';
import { ConfigModule } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import BitcoinPriceConfig from '../config/binance-api-config';
import { BitcoinPriceUpdateingStartedEvent } from './domain/event/bitcoin-price-updating-started.event';
import { BitcoinPriceService } from './domain/services/bitcoin-price.service';
import { BitcoinPriceRepository } from './infrastructure/repository/bitcoin-price.repository';

@Module({
  imports: [
    ConfigModule.forFeature(BitcoinPriceConfig),
    TypeOrmModule.forFeature([BitcoinPrice]),
    HttpModule,
    CqrsModule,
  ],
  providers: [
    FetchBitcoinPriceHandler,
    SaveBitcoinPriceHandler,
    BitcoinPriceSaga,
    BitcoinPriceService,
    BitcoinPriceRepository
  ],
  controllers: [BitcoinPriceController],
})
export class BitcoinPriceModule implements OnModuleInit {
  constructor(private readonly eventBus: EventBus) {}

  onModuleInit() {
    this.startCronJob();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  private async startCronJob() {
    await this.eventBus.publish(new BitcoinPriceUpdateingStartedEvent());
  }
}