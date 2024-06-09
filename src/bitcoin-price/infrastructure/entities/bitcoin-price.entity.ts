import BigNumber from 'bignumber.js';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BitcoinPrice {
  constructor(bidPrice: string, askPrice: string, midPrice: string) {
    this.bidPrice = bidPrice;
    this.askPrice = askPrice;
    this.midPrice = midPrice;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  bidPrice: string;

  @Column('decimal')
  askPrice: string;

  @Column('decimal')
  midPrice: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}