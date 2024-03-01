import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  originalUrl: string;

  @Column('text')
  shortUrl: string;

  @Column({default: 0})
  clickCount: number;

  @Column({nullable: true})
  title: string;
}
