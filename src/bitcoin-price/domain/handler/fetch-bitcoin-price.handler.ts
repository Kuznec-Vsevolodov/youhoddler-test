import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { FetchBitcoinPriceCommand } from '../command/fetch-bitcoin-price.command';
import { BitcoinPriceDto } from '../../application/dto/bitcoin-price.dto';
import { BitcoinPriceFetchedEvent } from '../event/bitcoin-price-fetched.event';
import { BinanceApiPriceFetcher } from 'src/bitcoin-price/infrastructure/api-fetcher/binance-api-price.fetcher';


@CommandHandler(FetchBitcoinPriceCommand)
export class FetchBitcoinPriceHandler implements ICommandHandler<FetchBitcoinPriceCommand> {

  constructor(
    private readonly eventBus: EventBus,
    private readonly binanceApiPriceFetcher: BinanceApiPriceFetcher
  ) {}

  async execute(command: FetchBitcoinPriceCommand) {
    try {
      const bitcoinPriceDto: BitcoinPriceDto = await this.binanceApiPriceFetcher.getCurrentBitcoinPrice();

      await this.eventBus.publish(new BitcoinPriceFetchedEvent(bitcoinPriceDto));
    } catch (error) {
      console.error('Error fetching Bitcoin price', error);
      throw error;
    }
  }
}
