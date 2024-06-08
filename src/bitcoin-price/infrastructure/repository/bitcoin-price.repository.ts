import { Injectable } from "@nestjs/common/decorators";
import { BitcoinPrice } from "../entities/bitcoin-price.entity";
import { Repository } from "typeorm";
import { BitcoinPriceDto } from "src/bitcoin-price/application/dto/bitcoin-price.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BitcoinPriceRepository
{
    public constructor(
        @InjectRepository(BitcoinPrice) private readonly bitcoinPriceRepository: Repository<BitcoinPrice>,
      ) {}

    async getNewestBitcoinPrice(): Promise<BitcoinPriceDto> {
        const bitcoinPrice: BitcoinPrice = await this.bitcoinPriceRepository.findOne({
            where: {},
            order: { createdAt: 'DESC' }
          });
    
        const bitcoinPriceDto: BitcoinPriceDto = new BitcoinPriceDto();
    
        bitcoinPriceDto.askPrice = bitcoinPrice.askPrice;
        bitcoinPriceDto.bidPrice = bitcoinPrice.bidPrice;
        bitcoinPriceDto.midPrice = bitcoinPrice.midPrice;

        return bitcoinPriceDto;
    }

    async saveBitcoinPrice(bitcoinPriceDto: BitcoinPriceDto): Promise<void> {
        const bitcoinPriceEntity = new BitcoinPrice();

        bitcoinPriceEntity.askPrice = bitcoinPriceDto.askPrice;
        bitcoinPriceEntity.bidPrice = bitcoinPriceDto.bidPrice;
        bitcoinPriceEntity.midPrice = bitcoinPriceDto.midPrice;

        await this.bitcoinPriceRepository.save(bitcoinPriceEntity);
    }
}