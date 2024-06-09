import { Injectable } from "@nestjs/common/decorators";
import { BitcoinPriceDto } from "src/bitcoin-price/application/dto/bitcoin-price.dto";
import BigNumber from 'bignumber.js';
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BinanceApiPriceFetcher
{
    private readonly serviceCommission: number;
    private readonly binanceApiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
      ) {
        this.serviceCommission = this.configService.get<number>('serviceCommission');
        this.binanceApiUrl = this.configService.get<string>('binancePriceApiUrl');
      }

    async getCurrentBitcoinPrice(): Promise<BitcoinPriceDto> {
        const response = await firstValueFrom(this.httpService.get(this.binanceApiUrl));
      
        const { bidPrice, askPrice } = response.data;

        const bidPriceWithCommission: BigNumber = new BigNumber(bidPrice)
            .mul(1 + this.serviceCommission / 100);

        const askPriceWithCommission: BigNumber = new BigNumber(askPrice)
            .mul(1 + this.serviceCommission / 100);

        const midPrice: BigNumber = bidPriceWithCommission
            .plus(askPriceWithCommission)
            .dividedBy(2);

        const bitcoinPriceDto: BitcoinPriceDto = {
            bidPrice: bidPriceWithCommission,
            askPrice: askPriceWithCommission,
            midPrice: midPrice,
        };

        return bitcoinPriceDto;
    }
}