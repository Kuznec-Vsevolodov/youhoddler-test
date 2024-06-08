import { BitcoinPriceDto } from "../../application/dto/bitcoin-price.dto";

export class BitcoinPriceFetchedEvent {
  constructor(public readonly bitcoinPriceDto: BitcoinPriceDto) {
  }
}