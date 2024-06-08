import BigNumber from 'bignumber.js';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BitcoinPrice {
  constructor(bidPrice: number, askPrice: number, midPrice: number) {
    this.bidPrice = bidPrice;
    this.askPrice = askPrice;
    this.midPrice = midPrice;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  bidPrice: number;

  @Column('decimal')
  askPrice: number;

  @Column('decimal')
  midPrice: number

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date
}