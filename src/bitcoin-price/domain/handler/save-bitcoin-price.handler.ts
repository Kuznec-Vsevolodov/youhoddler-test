import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveBitcoinPriceCommand } from '../command/save-bitcoin-price.command';
import { BitcoinPriceRepository } from 'src/bitcoin-price/infrastructure/repository/bitcoin-price.repository';

@CommandHandler(SaveBitcoinPriceCommand)
export class SaveBitcoinPriceHandler implements ICommandHandler<SaveBitcoinPriceCommand> {
  constructor(
    private readonly bitcoinPriceRepository: BitcoinPriceRepository,
  ) {}

  async execute(command: SaveBitcoinPriceCommand) {
    await this.bitcoinPriceRepository.saveBitcoinPrice(command.bitcoinPriceDto);
  }
}