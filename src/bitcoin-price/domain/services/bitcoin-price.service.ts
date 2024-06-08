import { Injectable } from "@nestjs/common";
import { BitcoinPriceDto } from "src/bitcoin-price/application/dto/bitcoin-price.dto";
import { BitcoinPriceRepository } from "src/bitcoin-price/infrastructure/repository/bitcoin-price.repository";

@Injectable()
export class BitcoinPriceService {
  constructor(
    private readonly bitcoinPriceRepository: BitcoinPriceRepository,
  ) {}

  async getBitcoinPrice(): Promise<BitcoinPriceDto> {
    return await this.bitcoinPriceRepository.getNewestBitcoinPrice();
  }

}
