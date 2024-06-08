import { Controller, Get } from '@nestjs/common';
import { BitcoinPriceService } from 'src/bitcoin-price/domain/services/bitcoin-price.service';

@Controller('bitcoin-price')
export class BitcoinPriceController {
  constructor(
    private readonly bitcoinPriceService: BitcoinPriceService,
  ) {}

  @Get()
  async getBitcoinPrice() {
    return this.bitcoinPriceService.getBitcoinPrice();
  }
}