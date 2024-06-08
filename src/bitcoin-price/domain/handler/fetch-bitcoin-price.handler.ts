import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { FetchBitcoinPriceCommand } from '../command/fetch-bitcoin-price.command';
import { SaveBitcoinPriceCommand } from '../command/save-bitcoin-price.command';
import { BitcoinPriceDto } from '../../application/dto/bitcoin-price.dto';
import { BitcoinPriceFetchedEvent } from '../event/bitcoin-price-fetched.event';

@CommandHandler(FetchBitcoinPriceCommand)
export class FetchBitcoinPriceHandler implements ICommandHandler<FetchBitcoinPriceCommand> {
  private readonly serviceCommission: number;
  private readonly binanceApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly eventBus: EventBus,
  ) {
    this.serviceCommission = this.configService.get<number>('serviceCommission');
    this.binanceApiUrl = this.configService.get<string>('binancePriceApiUrl');
  }

  async execute(command: FetchBitcoinPriceCommand) {

    try {
      const response = await firstValueFrom(this.httpService.get(this.binanceApiUrl));
      
      const { bidPrice, askPrice } = response.data;

      const bidPriceWithCommission = bidPrice * (1 + this.serviceCommission / 100);
      const askPriceWithCommission = askPrice * (1 + this.serviceCommission / 100);
      const midPrice = (bidPriceWithCommission + askPriceWithCommission) / 2;

      const bitcoinPriceDto: BitcoinPriceDto = {
        bidPrice: bidPriceWithCommission,
        askPrice: askPriceWithCommission,
        midPrice,
      };

      await this.eventBus.publish(new BitcoinPriceFetchedEvent(bitcoinPriceDto));
    } catch (error) {
      console.error('Error fetching Bitcoin price', error);
      throw error;
    }
  }
}
