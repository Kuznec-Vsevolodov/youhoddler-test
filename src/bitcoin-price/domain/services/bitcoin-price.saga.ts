import { Injectable } from '@nestjs/common';
import { CommandBus, Saga, ofType } from '@nestjs/cqrs';
import { FetchBitcoinPriceCommand } from '../command/fetch-bitcoin-price.command';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { BitcoinPriceFetchedEvent } from '../event/bitcoin-price-fetched.event';
import { SaveBitcoinPriceCommand } from '../command/save-bitcoin-price.command';
import { BitcoinPriceUpdateingStartedEvent } from '../event/bitcoin-price-updating-started.event';

@Injectable()
export class BitcoinPriceSaga {
  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  bitcoinPriceUpdatingProcessStarted = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(BitcoinPriceUpdateingStartedEvent),
      map(() => {
        this.commandBus.execute(new FetchBitcoinPriceCommand());
      })
    );
  }

  @Saga()
  bitcoinPriceFetched = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(BitcoinPriceFetchedEvent),
      map((event) => {
        this.commandBus.execute(new SaveBitcoinPriceCommand(event.bitcoinPriceDto));
      })
    );
  }
}