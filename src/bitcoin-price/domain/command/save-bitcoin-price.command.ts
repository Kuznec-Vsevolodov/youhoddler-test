import { BitcoinPriceDto } from '../../application/dto/bitcoin-price.dto';

export class SaveBitcoinPriceCommand {
  constructor(public readonly bitcoinPriceDto: BitcoinPriceDto) {}
}