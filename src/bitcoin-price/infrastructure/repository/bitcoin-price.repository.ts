import { Injectable } from "@nestjs/common/decorators";
import { BitcoinPrice } from "../entities/bitcoin-price.entity";
import { Repository } from "typeorm";
import { BitcoinPriceDto } from "src/bitcoin-price/application/dto/bitcoin-price.dto";
import { InjectRepository } from "@nestjs/typeorm";
import BigNumber from "bignumber.js";

@Injectable()
export class BitcoinPriceRepository
{
    public constructor(
        @InjectRepository(BitcoinPrice) private readonly bitcoinPriceRepository: Repository<BitcoinPrice>,
      ) {}

    async getNewestBitcoinPrice(): Promise<BitcoinPriceDto> {
        const bitcoinPrice: BitcoinPrice = await this.bitcoinPriceRepository.find({
          order: { createdAt: 'DESC' },
          take: 1,
        }).then(results => results[0]);

        const bitcoinPriceDto: BitcoinPriceDto = {
          bidPrice: new BigNumber(bitcoinPrice.bidPrice),
          askPrice: new BigNumber(bitcoinPrice.askPrice),
          midPrice: new BigNumber(bitcoinPrice.midPrice),
        };

        return bitcoinPriceDto;
    }

    async saveBitcoinPrice(bitcoinPriceDto: BitcoinPriceDto): Promise<void> {
        const { askPrice, bidPrice, midPrice } = bitcoinPriceDto;

        const bitcoinPriceEntity: BitcoinPrice = new BitcoinPrice(
          bidPrice.toString(), 
          askPrice.toString(), 
          midPrice.toString()
        );

        await this.bitcoinPriceRepository.save(bitcoinPriceEntity);
    }
}