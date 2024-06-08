import BigNumber from "bignumber.js";

export class BitcoinPriceDto {
  bidPrice: BigNumber;
  askPrice: BigNumber;
  midPrice: BigNumber;
}