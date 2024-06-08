import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BitcoinPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  bidPrice: number;

  @Column('decimal')
  askPrice: number;

  @Column('decimal')
  midPrice: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}